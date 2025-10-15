/**
 * Export functionality for TravelTrack Tourism Guide
 * Enhances traceability by allowing users to export their travel data
 */

class TravelExport {
    /**
     * Initialize the export functionality
     * @param {TravelTrace} traceSystem - The traceability system instance
     */
    constructor(traceSystem) {
        this.traceSystem = traceSystem;
        this.setupEventListeners();
    }

    /**
     * Set up event listeners for export buttons
     */
    setupEventListeners() {
        // Export journey button
        const exportJourneyBtn = document.getElementById('export-journey');
        if (exportJourneyBtn) {
            exportJourneyBtn.addEventListener('click', () => this.exportJourney());
        }

        // Export timeline button
        const exportTimelineBtn = document.getElementById('export-timeline');
        if (exportTimelineBtn) {
            exportTimelineBtn.addEventListener('click', () => this.exportTimeline());
        }

        // Export statistics button
        const exportStatsBtn = document.getElementById('export-stats');
        if (exportStatsBtn) {
            exportStatsBtn.addEventListener('click', () => this.exportStatistics());
        }
    }

    /**
     * Export the user's journey data
     */
    exportJourney() {
        // Get user data
        const userData = JSON.parse(localStorage.getItem('userData')) || {
            visitedPlaces: [],
            wishlist: []
        };

        // Create export data
        const exportData = {
            visitedPlaces: userData.visitedPlaces,
            wishlist: userData.wishlist,
            exportDate: new Date().toISOString(),
            exportType: 'journey'
        };

        // Generate and download file
        this.downloadJSON(exportData, 'traveltrack-journey.json');

        // Record trace event
        this.traceSystem.startTrace('export');
        this.traceSystem.addEvent('Exported journey data');
        this.traceSystem.endTrace();
    }

    /**
     * Export the user's timeline data
     */
    exportTimeline() {
        // Get timeline data
        const timelineData = this.traceSystem.generateTimeline();

        // Create export data
        const exportData = {
            timeline: timelineData,
            exportDate: new Date().toISOString(),
            exportType: 'timeline'
        };

        // Generate and download file
        this.downloadJSON(exportData, 'traveltrack-timeline.json');

        // Record trace event
        this.traceSystem.startTrace('export');
        this.traceSystem.addEvent('Exported timeline data');
        this.traceSystem.endTrace();
    }

    /**
     * Export the user's statistics data
     */
    exportStatistics() {
        // Get statistics data
        const statsData = this.traceSystem.generateStatistics();

        // Create export data
        const exportData = {
            statistics: statsData,
            exportDate: new Date().toISOString(),
            exportType: 'statistics'
        };

        // Generate and download file
        this.downloadJSON(exportData, 'traveltrack-statistics.json');

        // Record trace event
        this.traceSystem.startTrace('export');
        this.traceSystem.addEvent('Exported statistics data');
        this.traceSystem.endTrace();
    }

    /**
     * Generate CSV format for timeline data
     * @returns {string} CSV formatted data
     */
    generateTimelineCSV() {
        const timeline = this.traceSystem.generateTimeline();
        let csv = 'Date,Event,Type,Details\n';

        timeline.forEach(item => {
            const date = new Date(item.timestamp).toLocaleDateString();
            const event = item.event.replace(/,/g, ';');
            const type = item.type.replace(/,/g, ';');
            const details = item.details ? item.details.replace(/,/g, ';') : '';

            csv += `${date},"${event}","${type}","${details}"\n`;
        });

        return csv;
    }

    /**
     * Download data as a JSON file
     * @param {Object} data - The data to download
     * @param {string} filename - The filename for the download
     */
    downloadJSON(data, filename) {
        const dataStr = JSON.stringify(data, null, 2);
        this.downloadFile(dataStr, filename, 'application/json');
    }

    /**
     * Download data as a CSV file
     * @param {string} csv - The CSV data to download
     * @param {string} filename - The filename for the download
     */
    downloadCSV(csv, filename) {
        this.downloadFile(csv, filename, 'text/csv');
    }

    /**
     * Generic file download function
     * @param {string} content - The content to download
     * @param {string} filename - The filename for the download
     * @param {string} contentType - The content type of the file
     */
    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);

        // Show success message
        this.showExportMessage(`Successfully exported ${filename}`);
    }

    /**
     * Show export success message
     * @param {string} message - The message to display
     */
    showExportMessage(message) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'export-message';
        messageEl.textContent = message;
        
        // Add to body
        document.body.appendChild(messageEl);
        
        // Remove after delay
        setTimeout(() => {
            messageEl.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 500);
        }, 3000);
    }
}