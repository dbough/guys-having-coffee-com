/**
 * Guys Having Coffee - JavaScript Enhancements
 * This script provides progressive enhancements for:
 * 1. Auto-calculating next meetup date (1st Saturday & 3rd Tuesday)
 * 2. Generating calendar service links
 * All functionality works without this script via fallback content.
 */

(function() {
    'use strict';

    /**
     * Calculate the next meetup date based on current date
     * Rules: 1st Saturday and 3rd Tuesday of each month
     */
    function getNextMeetupDate() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        
        // Calculate 1st Saturday of current month
        const firstSaturday = getFirstSaturday(currentYear, currentMonth);
        
        // Calculate 3rd Tuesday of current month
        const thirdTuesday = getThirdTuesday(currentYear, currentMonth);
        
        // Calculate 1st Saturday of next month
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const firstSaturdayNextMonth = getFirstSaturday(nextMonthYear, nextMonth);
        
        // Find the next upcoming date
        const dates = [firstSaturday, thirdTuesday, firstSaturdayNextMonth];
        const futureDates = dates.filter(date => date > now);
        
        if (futureDates.length > 0) {
            return futureDates[0];
        }
        
        // If no dates in current/next month, get first Saturday of month after next
        const monthAfterNext = nextMonth === 11 ? 0 : nextMonth + 1;
        const monthAfterNextYear = nextMonth === 11 ? nextMonthYear + 1 : nextMonthYear;
        return getFirstSaturday(monthAfterNextYear, monthAfterNext);
    }

    /**
     * Get the first Saturday of a given month
     */
    function getFirstSaturday(year, month) {
        const date = new Date(year, month, 1);
        const day = date.getDay();
        const daysUntilSaturday = (6 - day + 7) % 7;
        date.setDate(1 + daysUntilSaturday);
        date.setHours(8, 0, 0, 0); // 8:00 AM
        return date;
    }

    /**
     * Get the third Tuesday of a given month
     */
    function getThirdTuesday(year, month) {
        const date = new Date(year, month, 1);
        const day = date.getDay();
        const daysUntilTuesday = (2 - day + 7) % 7;
        date.setDate(1 + daysUntilTuesday + 14); // First Tuesday + 2 weeks = Third Tuesday
        date.setHours(7, 30, 0, 0); // 7:30 AM
        return date;
    }

    /**
     * Format date for display
     */
    function formatMeetupDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const dayNum = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        const timeStr = formatTime(hours, minutes);
        
        return `${dayName}, ${monthName} ${dayNum}, ${year} at ${timeStr}`;
    }

    /**
     * Format time in 12-hour format
     */
    function formatTime(hours, minutes) {
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${period}`;
    }

    /**
     * Update the next meetup date in the DOM
     */
    function updateNextMeetupDate() {
        const nextMeetup = getNextMeetupDate();
        const element = document.getElementById('next-meetup-date');
        
        if (element) {
            element.textContent = formatMeetupDate(nextMeetup);
        }
        
        return nextMeetup;
    }

    /**
     * Generate calendar service links
     */
    function generateCalendarLinks(date) {
        const title = 'Guys Having Coffee';
        const location = 'Black & Brew @ the Library, 100 Lake Morton Dr, Lakeland, FL 33801';
        const description = 'Casual coffee meetup for men. Low effort, no commitment, no expectations.';
        
        // Determine end time based on day of week
        const endDate = new Date(date);
        if (date.getDay() === 6) { // Saturday
            endDate.setHours(10, 0, 0, 0); // 10:00 AM
        } else { // Tuesday
            endDate.setHours(9, 0, 0, 0); // 9:00 AM
        }
        
        // Format dates for calendar services
        const startStr = formatDateForCalendar(date);
        const endStr = formatDateForCalendar(endDate);
        
        // Google Calendar URL
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
        
        // Outlook.com URL
        const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${date.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
        
        // Office 365 URL
        const office365Url = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${date.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
        
        return {
            google: googleUrl,
            outlook: outlookUrl,
            office365: office365Url
        };
    }

    /**
     * Format date for calendar services (yyyyMMddTHHmmss format in UTC)
     */
    function formatDateForCalendar(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = '00';
        
        return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    }

    /**
     * Add calendar service links to the DOM
     */
    function addCalendarServiceLinks(date) {
        const links = generateCalendarLinks(date);
        const container = document.getElementById('service-calendar-links');
        
        if (!container) return;
        
        const html = `
            <a href="${links.google}" target="_blank" rel="noopener noreferrer" class="calendar-button">Add to Google Calendar</a>
            <a href="${links.outlook}" target="_blank" rel="noopener noreferrer" class="calendar-button">Add to Outlook.com</a>
            <a href="${links.office365}" target="_blank" rel="noopener noreferrer" class="calendar-button">Add to Office 365</a>
        `;
        
        container.innerHTML = html;
    }

    /**
     * Generate .ics file content
     */
    function generateICSFile(date) {
        const title = 'Guys Having Coffee';
        const location = 'Black & Brew @ the Library, 100 Lake Morton Dr, Lakeland, FL 33801';
        const description = 'Casual coffee meetup for men. Low effort, no commitment, no expectations.';
        
        // Determine end time
        const endDate = new Date(date);
        if (date.getDay() === 6) { // Saturday
            endDate.setHours(10, 0, 0, 0);
        } else { // Tuesday
            endDate.setHours(9, 0, 0, 0);
        }
        
        const startStr = formatDateForICS(date);
        const endStr = formatDateForICS(endDate);
        const timestamp = formatDateForICS(new Date());
        
        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Guys Having Coffee//Event//EN',
            'BEGIN:VEVENT',
            `UID:${timestamp}@guyshavingcoffee.com`,
            `DTSTAMP:${timestamp}`,
            `DTSTART:${startStr}`,
            `DTEND:${endStr}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description}`,
            `LOCATION:${location}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
        
        return ics;
    }

    /**
     * Format date for ICS file (yyyyMMddTHHmmss format)
     */
    function formatDateForICS(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    }

    /**
     * Create downloadable .ics file
     */
    function createICSDownload(date) {
        const icsContent = generateICSFile(date);
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        // Update the download link
        const downloadLink = document.querySelector('a[download]');
        if (downloadLink) {
            downloadLink.href = url;
            downloadLink.download = 'guys-having-coffee-meetup.ics';
        }
    }

    /**
     * Initialize all enhancements
     */
    function init() {
        // Update next meetup date
        const nextMeetup = updateNextMeetupDate();
        
        // Add calendar service links
        addCalendarServiceLinks(nextMeetup);
        
        // Create ICS download
        createICSDownload(nextMeetup);
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
