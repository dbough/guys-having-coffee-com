// Meeting schedule configuration
const MEETINGS = {
    firstSaturday: {
        name: 'First Saturday Meeting',
        dayOfWeek: 6, // Saturday
        occurrence: 1, // 1st occurrence
        startHour: 8,
        startMinute: 0,
        endHour: 10,
        endMinute: 0
    },
    thirdTuesday: {
        name: 'Third Tuesday Meeting',
        dayOfWeek: 2, // Tuesday
        occurrence: 3, // 3rd occurrence
        startHour: 7,
        startMinute: 30,
        endHour: 9,
        endMinute: 0
    }
};

const LOCATION = {
    name: 'Black & Brew (at the Library)',
    address: '100 Lake Morton Dr, Lakeland, FL 33801'
};

/**
 * Get the nth occurrence of a specific day of the week in a given month
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @param {number} dayOfWeek - Day of week (0=Sunday, 6=Saturday)
 * @param {number} occurrence - Which occurrence (1=first, 2=second, etc.)
 * @returns {Date} The date of the nth occurrence
 */
function getNthDayOfMonth(year, month, dayOfWeek, occurrence) {
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();

    // Calculate days until the target day of week
    let daysUntilTarget = (dayOfWeek - firstDayOfWeek + 7) % 7;

    // Calculate the date of the nth occurrence
    const dateOfOccurrence = 1 + daysUntilTarget + (occurrence - 1) * 7;

    return new Date(year, month, dateOfOccurrence);
}

/**
 * Get the next meeting date from the current date
 * @returns {Object} Next meeting details
 */
function getNextMeeting() {
    const now = new Date();
    const candidates = [];

    // Check current month and next 2 months for both meeting types
    for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
        const checkDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
        const year = checkDate.getFullYear();
        const month = checkDate.getMonth();

        // First Saturday
        const firstSat = getNthDayOfMonth(year, month, MEETINGS.firstSaturday.dayOfWeek, MEETINGS.firstSaturday.occurrence);
        firstSat.setHours(MEETINGS.firstSaturday.startHour, MEETINGS.firstSaturday.startMinute, 0, 0);

        // Third Tuesday
        const thirdTue = getNthDayOfMonth(year, month, MEETINGS.thirdTuesday.dayOfWeek, MEETINGS.thirdTuesday.occurrence);
        thirdTue.setHours(MEETINGS.thirdTuesday.startHour, MEETINGS.thirdTuesday.startMinute, 0, 0);

        // Only add if the meeting is in the future
        if (firstSat > now) {
            candidates.push({
                date: firstSat,
                type: 'firstSaturday',
                config: MEETINGS.firstSaturday
            });
        }

        if (thirdTue > now) {
            candidates.push({
                date: thirdTue,
                type: 'thirdTuesday',
                config: MEETINGS.thirdTuesday
            });
        }
    }

    // Sort by date and return the earliest
    candidates.sort((a, b) => a.date - b.date);
    return candidates[0];
}

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {Object} Formatted date components
 */
function formatMeetingDate(date) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return {
        month: months[date.getMonth()],
        day: date.getDate(),
        weekday: weekdays[date.getDay()],
        year: date.getFullYear()
    };
}

/**
 * Format time for display
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @returns {string} Formatted time (e.g., "8:00 AM")
 */
function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
}

/**
 * Update the next meeting display
 */
function updateNextMeeting() {
    const nextMeeting = getNextMeeting();

    if (!nextMeeting) {
        console.error('Could not determine next meeting');
        return;
    }

    const formatted = formatMeetingDate(nextMeeting.date);
    const startTime = formatTime(nextMeeting.config.startHour, nextMeeting.config.startMinute);
    const endTime = formatTime(nextMeeting.config.endHour, nextMeeting.config.endMinute);

    // Update DOM elements
    document.getElementById('nextMonth').textContent = formatted.month;
    document.getElementById('nextDay').textContent = formatted.day;
    document.getElementById('nextWeekday').textContent = formatted.weekday;
    document.getElementById('nextMeetupTime').textContent = `${startTime} - ${endTime}`;
}

/**
 * Generate iCal (.ics) file content for recurring meetings
 * @returns {string} iCal file content
 */
function generateICalFile() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // Helper to format date for iCal (YYYYMMDD)
    const formatICalDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    };

    // Helper to format datetime for iCal (YYYYMMDDTHHMMSS)
    const formatICalDateTime = (date, hour, minute) => {
        const dateStr = formatICalDate(date);
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        return `${dateStr}T${hourStr}${minuteStr}00`;
    };

    // Get the first occurrence of each meeting type in the current or next month
    const now_date = new Date();
    const firstSatDate = getNthDayOfMonth(now_date.getFullYear(), now_date.getMonth(), MEETINGS.firstSaturday.dayOfWeek, MEETINGS.firstSaturday.occurrence);
    if (firstSatDate < now_date) {
        firstSatDate.setMonth(firstSatDate.getMonth() + 1);
    }

    const thirdTueDate = getNthDayOfMonth(now_date.getFullYear(), now_date.getMonth(), MEETINGS.thirdTuesday.dayOfWeek, MEETINGS.thirdTuesday.occurrence);
    if (thirdTueDate < now_date) {
        thirdTueDate.setMonth(thirdTueDate.getMonth() + 1);
    }

    let icalContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Guys Having Coffee//Meetup Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Guys Having Coffee',
        'X-WR-TIMEZONE:America/New_York',
        ''
    ];

    // First Saturday Event
    const firstSatStart = formatICalDateTime(firstSatDate, MEETINGS.firstSaturday.startHour, MEETINGS.firstSaturday.startMinute);
    const firstSatEnd = formatICalDateTime(firstSatDate, MEETINGS.firstSaturday.endHour, MEETINGS.firstSaturday.endMinute);

    icalContent.push(
        'BEGIN:VEVENT',
        `UID:first-saturday-${timestamp}@guyshavingcoffee.com`,
        `DTSTAMP:${timestamp}`,
        `DTSTART:${firstSatStart}`,
        `DTEND:${firstSatEnd}`,
        'RRULE:FREQ=MONTHLY;BYDAY=1SA',
        'SUMMARY:Guys Having Coffee',
        `LOCATION:${LOCATION.name}\\, ${LOCATION.address}`,
        'DESCRIPTION:Join us for coffee and genuine connection. No RSVP required. No agenda. No pressure.',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        ''
    );

    // Third Tuesday Event
    const thirdTueStart = formatICalDateTime(thirdTueDate, MEETINGS.thirdTuesday.startHour, MEETINGS.thirdTuesday.startMinute);
    const thirdTueEnd = formatICalDateTime(thirdTueDate, MEETINGS.thirdTuesday.endHour, MEETINGS.thirdTuesday.endMinute);

    icalContent.push(
        'BEGIN:VEVENT',
        `UID:third-tuesday-${timestamp}@guyshavingcoffee.com`,
        `DTSTAMP:${timestamp}`,
        `DTSTART:${thirdTueStart}`,
        `DTEND:${thirdTueEnd}`,
        'RRULE:FREQ=MONTHLY;BYDAY=3TU',
        'SUMMARY:Guys Having Coffee',
        `LOCATION:${LOCATION.name}\\, ${LOCATION.address}`,
        'DESCRIPTION:Join us for coffee and genuine connection. No RSVP required. No agenda. No pressure.',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        ''
    );

    icalContent.push('END:VCALENDAR');

    return icalContent.join('\r\n');
}

/**
 * Generate Google Calendar URL for recurring meetings
 * Note: Google Calendar URLs have limitations with recurring events, so we'll create for the next meeting
 * @returns {string} Google Calendar URL
 */
function generateGoogleCalendarUrl() {
    const nextMeeting = getNextMeeting();

    if (!nextMeeting) {
        return '#';
    }

    const date = nextMeeting.date;
    const config = nextMeeting.config;

    // Format: YYYYMMDDTHHmmss
    const formatGoogleDateTime = (d, hour, minute) => {
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        return `${year}${month}${day}T${h}${m}00`;
    };

    const startDateTime = formatGoogleDateTime(date, config.startHour, config.startMinute);
    const endDateTime = formatGoogleDateTime(date, config.endHour, config.endMinute);

    // Determine recurrence rule
    let recurrence = '';
    if (nextMeeting.type === 'firstSaturday') {
        recurrence = 'RRULE:FREQ=MONTHLY;BYDAY=1SA';
    } else if (nextMeeting.type === 'thirdTuesday') {
        recurrence = 'RRULE:FREQ=MONTHLY;BYDAY=3TU';
    }

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: 'Guys Having Coffee',
        dates: `${startDateTime}/${endDateTime}`,
        details: 'Join us for coffee and genuine connection. No RSVP required. No agenda. No pressure.',
        location: `${LOCATION.name}, ${LOCATION.address}`,
        recur: recurrence
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Initialize calendar dropdown functionality
 */
function initCalendarDropdown() {
    const calendarBtn = document.getElementById('calendarBtn');
    const calendarDropdown = document.getElementById('calendarDropdown');
    const googleCalendarLink = document.getElementById('googleCalendarLink');
    const icsDownloadLink = document.getElementById('icsDownloadLink');

    // Toggle dropdown
    calendarBtn.addEventListener('click', () => {
        calendarDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!calendarBtn.contains(e.target) && !calendarDropdown.contains(e.target)) {
            calendarDropdown.classList.remove('show');
        }
    });

    // Set Google Calendar link
    googleCalendarLink.href = generateGoogleCalendarUrl();

    // Set iCal download link
    const icalContent = generateICalFile();
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    icsDownloadLink.href = url;
}

/**
 * Initialize newsletter form
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your interest! MailerLite integration is coming soon.');
    });
}

/**
 * Update footer year
 */
function updateFooterYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

/**
 * Initialize the application
 */
function init() {
    updateNextMeeting();
    initCalendarDropdown();
    initNewsletterForm();
    updateFooterYear();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
