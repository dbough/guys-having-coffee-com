// Calculate next meetup based on recurring schedule
function getNextMeetup() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Define meetup types
    const meetups = [];

    // Generate meetups for current month and next 3 months
    for (let i = 0; i < 4; i++) {
        const checkMonth = new Date(currentYear, currentMonth + i, 1);
        const year = checkMonth.getFullYear();
        const month = checkMonth.getMonth();

        // First Saturday
        const firstSaturday = getFirstSaturday(year, month);
        meetups.push({
            date: new Date(year, month, firstSaturday, 8, 0, 0),
            endDate: new Date(year, month, firstSaturday, 10, 0, 0),
            type: '1st Saturday',
            time: '8:00 AM - 10:00 AM'
        });

        // Third Tuesday
        const thirdTuesday = getThirdTuesday(year, month);
        meetups.push({
            date: new Date(year, month, thirdTuesday, 7, 30, 0),
            endDate: new Date(year, month, thirdTuesday, 9, 0, 0),
            type: '3rd Tuesday',
            time: '7:30 AM - 9:00 AM'
        });
    }

    // Find the next upcoming meetup
    const nextMeetup = meetups.find(meetup => meetup.date > now);
    return nextMeetup || meetups[0];
}

function getFirstSaturday(year, month) {
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();
    // Saturday is 6, calculate days until first Saturday
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    return 1 + daysUntilSaturday;
}

function getThirdTuesday(year, month) {
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();
    // Tuesday is 2, calculate days until first Tuesday
    const daysUntilTuesday = (2 - dayOfWeek + 7) % 7;
    const firstTuesday = 1 + daysUntilTuesday;
    // Third Tuesday is 14 days after first Tuesday
    return firstTuesday + 14;
}

function formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        fullDate: date
    };
}

function updateNextMeetup() {
    const nextMeetup = getNextMeetup();
    const formatted = formatDate(nextMeetup.date);

    document.getElementById('dateDay').textContent = formatted.day;
    document.getElementById('dateMonth').textContent = formatted.month;
    document.getElementById('nextMeetupTitle').textContent = nextMeetup.type;
    document.getElementById('nextMeetupTime').textContent = nextMeetup.time;

    return nextMeetup;
}

// Generate .ics file content for Apple Calendar and Outlook
function generateICS(meetup) {
    const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const location = 'Black & Brew (at the Library), 100 Lake Morton Dr, Lakeland, FL 33801';
    const description = 'Join us for coffee and conversation at our regular meetup.';

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Guys Having Coffee//EN',
        'BEGIN:VEVENT',
        `UID:${meetup.date.getTime()}@guyshavingcoffee.org`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(meetup.date)}`,
        `DTEND:${formatICSDate(meetup.endDate)}`,
        `SUMMARY:Guys Having Coffee - ${meetup.type}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
}

// Generate Google Calendar URL
function generateGoogleCalendarURL(meetup) {
    const formatGoogleDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const title = encodeURIComponent(`Guys Having Coffee - ${meetup.type}`);
    const location = encodeURIComponent('Black & Brew (at the Library), 100 Lake Morton Dr, Lakeland, FL 33801');
    const description = encodeURIComponent('Join us for coffee and conversation at our regular meetup.');
    const dates = `${formatGoogleDate(meetup.date)}/${formatGoogleDate(meetup.endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${description}&location=${location}`;
}

// Download .ics file
function downloadICS(icsContent, filename) {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const nextMeetup = updateNextMeetup();

    // Google Calendar button
    document.getElementById('addToGoogleCalendar').addEventListener('click', function() {
        const url = generateGoogleCalendarURL(nextMeetup);
        window.open(url, '_blank');
    });

    // Apple/Outlook Calendar button
    document.getElementById('addToAppleCalendar').addEventListener('click', function() {
        const icsContent = generateICS(nextMeetup);
        const filename = `guys-having-coffee-${nextMeetup.type.toLowerCase().replace(/\s+/g, '-')}.ics`;
        downloadICS(icsContent, filename);
    });

    // Placeholder form submission
    const form = document.querySelector('.placeholder-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Email signup will be activated once MailerLite is integrated!');
        });
    }
});
