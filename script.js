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
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        weekday: days[date.getDay()],
        fullDate: date
    };
}

function updateNextMeetup() {
    const nextMeetup = getNextMeetup();
    const formatted = formatDate(nextMeetup.date);

    document.getElementById('dateDay').textContent = formatted.day;
    document.getElementById('dateMonth').textContent = formatted.month;
    document.getElementById('nextMeetupTime').textContent = `${formatted.weekday}, ${nextMeetup.time}`;

    return nextMeetup;
}

// Generate .ics file content for Apple Calendar and Outlook with recurring events
function generateICS(meetup) {
    const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const location = 'Black & Brew (at the Library), 100 Lake Morton Dr, Lakeland, FL 33801';
    const description = 'Join us for coffee and conversation at our regular meetup.';

    // Determine recurrence rule based on meetup type
    let rrule;
    if (meetup.type === '1st Saturday') {
        // First Saturday of every month
        rrule = 'RRULE:FREQ=MONTHLY;BYDAY=1SA';
    } else {
        // Third Tuesday of every month
        rrule = 'RRULE:FREQ=MONTHLY;BYDAY=3TU';
    }

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Guys Having Coffee//EN',
        'BEGIN:VEVENT',
        `UID:${meetup.type.toLowerCase().replace(/\s+/g, '-')}@guyshavingcoffee.org`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(meetup.date)}`,
        `DTEND:${formatICSDate(meetup.endDate)}`,
        rrule,
        `SUMMARY:Guys Having Coffee - ${meetup.type}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
}

// Generate Google Calendar URL with recurrence
function generateGoogleCalendarURL(meetup) {
    const formatGoogleDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const title = encodeURIComponent(`Guys Having Coffee - ${meetup.type}`);
    const location = encodeURIComponent('Black & Brew (at the Library), 100 Lake Morton Dr, Lakeland, FL 33801');
    const description = encodeURIComponent('Join us for coffee and conversation at our regular meetup.');
    const dates = `${formatGoogleDate(meetup.date)}/${formatGoogleDate(meetup.endDate)}`;

    // Add recurrence rule for Google Calendar
    let recurrence;
    if (meetup.type === '1st Saturday') {
        recurrence = encodeURIComponent('RRULE:FREQ=MONTHLY;BYDAY=1SA');
    } else {
        recurrence = encodeURIComponent('RRULE:FREQ=MONTHLY;BYDAY=3TU');
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${description}&location=${location}&recur=${recurrence}`;
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
    // Add sticky header effect on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Add loading state before updating meetup
    const dateBadgeEl = document.querySelector('.date-badge');
    if (dateBadgeEl) {
        dateBadgeEl.classList.add('loading');
    }

    // Small delay to show loading animation
    setTimeout(() => {
        const nextMeetup = updateNextMeetup();

        if (dateBadgeEl) {
            dateBadgeEl.classList.remove('loading');
        }

        // Google Calendar button
        const googleBtn = document.getElementById('addToGoogleCalendar');
        if (googleBtn) {
            googleBtn.addEventListener('click', function() {
                const url = generateGoogleCalendarURL(nextMeetup);
                window.open(url, '_blank');
            });
        }
    }, 300);

    // Placeholder form submission with visual feedback
    const form = document.querySelector('.placeholder-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalText = button.textContent;

            // Show feedback
            button.textContent = 'Coming Soon!';
            button.style.background = 'var(--coffee-medium)';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        });
    }

    // Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.schedule-item').forEach(item => {
            observer.observe(item);
        });
    }
});
