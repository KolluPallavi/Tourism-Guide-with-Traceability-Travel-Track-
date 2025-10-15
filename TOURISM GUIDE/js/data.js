// Sample destination data for the tourism guide
const destinations = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        region: "europe",
        activities: ["city", "cultural"],
        description: "Known as the City of Light, Paris is famous for its iconic Eiffel Tower, world-class museums like the Louvre, and charming cafes along the Seine River.",
        rating: 4.7,
        image: "img/paris.jpg",
        gallery: ["img/paris-1.jpg", "img/paris-2.jpg", "img/paris-3.jpg"],
        coordinates: { lat: 48.8566, lng: 2.3522 },
        highlights: [
            { icon: "fa-landmark", text: "Eiffel Tower" },
            { icon: "fa-palette", text: "Louvre Museum" },
            { icon: "fa-church", text: "Notre-Dame Cathedral" },
            { icon: "fa-utensils", text: "French Cuisine" },
            { icon: "fa-store", text: "Shopping on Champs-Élysées" },
            { icon: "fa-tree", text: "Luxembourg Gardens" }
        ],
        tags: ["romantic", "historic", "art", "food"]
    },
    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        region: "asia",
        activities: ["beach", "cultural", "adventure"],
        description: "A tropical paradise known for its beautiful beaches, lush rice terraces, ancient temples, and vibrant culture. Bali offers a perfect blend of relaxation and adventure.",
        rating: 4.6,
        image: "img/bali.jpg",
        gallery: ["img/bali-1.jpg", "img/bali-2.jpg", "img/bali-3.jpg"],
        coordinates: { lat: -8.4095, lng: 115.1889 },
        highlights: [
            { icon: "fa-water", text: "Beautiful Beaches" },
            { icon: "fa-mountain", text: "Rice Terraces" },
            { icon: "fa-pray", text: "Ancient Temples" },
            { icon: "fa-swimmer", text: "Surfing" },
            { icon: "fa-spa", text: "Spa Treatments" },
            { icon: "fa-drum", text: "Traditional Dance" }
        ],
        tags: ["tropical", "relaxation", "spiritual", "nature"]
    },
    {
        id: 3,
        name: "New York City",
        country: "United States",
        region: "north-america",
        activities: ["city", "cultural"],
        description: "The Big Apple offers world-famous attractions like Times Square, Central Park, and the Statue of Liberty, along with incredible museums, Broadway shows, and diverse cuisine.",
        rating: 4.5,
        image: "img/nyc.jpg",
        gallery: ["img/nyc-1.jpg", "img/nyc-2.jpg", "img/nyc-3.jpg"],
        coordinates: { lat: 40.7128, lng: -74.0060 },
        highlights: [
            { icon: "fa-city", text: "Times Square" },
            { icon: "fa-tree", text: "Central Park" },
            { icon: "fa-monument", text: "Statue of Liberty" },
            { icon: "fa-building", text: "Empire State Building" },
            { icon: "fa-theater-masks", text: "Broadway Shows" },
            { icon: "fa-hamburger", text: "Diverse Cuisine" }
        ],
        tags: ["urban", "shopping", "entertainment", "food"]
    },
    {
        id: 4,
        name: "Kyoto",
        country: "Japan",
        region: "asia",
        activities: ["cultural", "city"],
        description: "Japan's cultural capital features over 1,600 Buddhist temples, 400 Shinto shrines, traditional wooden houses, imperial palaces, and beautiful gardens.",
        rating: 4.8,
        image: "img/kyoto.jpg",
        gallery: ["img/kyoto-1.jpg", "img/kyoto-2.jpg", "img/kyoto-3.jpg"],
        coordinates: { lat: 35.0116, lng: 135.7681 },
        highlights: [
            { icon: "fa-torii-gate", text: "Fushimi Inari Shrine" },
            { icon: "fa-tree", text: "Bamboo Forest" },
            { icon: "fa-home", text: "Traditional Ryokans" },
            { icon: "fa-leaf", text: "Japanese Gardens" },
            { icon: "fa-utensils", text: "Traditional Cuisine" },
            { icon: "fa-theater-masks", text: "Geisha Culture" }
        ],
        tags: ["traditional", "temples", "peaceful", "historic"]
    },
    {
        id: 5,
        name: "Santorini",
        country: "Greece",
        region: "europe",
        activities: ["beach", "cultural"],
        description: "Famous for its stunning white-washed buildings with blue domes, dramatic cliffs, and breathtaking sunsets over the Aegean Sea. A perfect romantic getaway.",
        rating: 4.9,
        image: "img/santorini.jpg",
        gallery: ["img/santorini-1.jpg", "img/santorini-2.jpg", "img/santorini-3.jpg"],
        coordinates: { lat: 36.3932, lng: 25.4615 },
        highlights: [
            { icon: "fa-mountain", text: "Caldera Views" },
            { icon: "fa-church", text: "Blue Domed Churches" },
            { icon: "fa-water", text: "Black Sand Beaches" },
            { icon: "fa-wine-glass", text: "Wine Tasting" },
            { icon: "fa-ship", text: "Boat Tours" },
            { icon: "fa-sun", text: "Sunset in Oia" }
        ],
        tags: ["romantic", "scenic", "island", "relaxation"]
    },
    {
        id: 6,
        name: "Cape Town",
        country: "South Africa",
        region: "africa",
        activities: ["adventure", "city", "beach"],
        description: "A stunning coastal city nestled between mountains and the ocean, offering diverse experiences from wildlife safaris to wine tasting, beautiful beaches, and vibrant culture.",
        rating: 4.6,
        image: "img/cape-town.jpg",
        gallery: ["img/cape-town-1.jpg", "img/cape-town-2.jpg", "img/cape-town-3.jpg"],
        coordinates: { lat: -33.9249, lng: 18.4241 },
        highlights: [
            { icon: "fa-mountain", text: "Table Mountain" },
            { icon: "fa-water", text: "Cape of Good Hope" },
            { icon: "fa-wine-glass", text: "Wine Regions" },
            { icon: "fa-paw", text: "Wildlife Safaris" },
            { icon: "fa-umbrella-beach", text: "Beautiful Beaches" },
            { icon: "fa-history", text: "Robben Island" }
        ],
        tags: ["scenic", "wildlife", "wine", "diverse"]
    },
    {
        id: 7,
        name: "Rio de Janeiro",
        country: "Brazil",
        region: "south-america",
        activities: ["beach", "city", "adventure"],
        description: "Known for its stunning beaches, iconic Christ the Redeemer statue, vibrant carnival celebrations, and breathtaking landscapes where mountains meet the sea.",
        rating: 4.5,
        image: "img/rio.jpg",
        gallery: ["img/rio-1.jpg", "img/rio-2.jpg", "img/rio-3.jpg"],
        coordinates: { lat: -22.9068, lng: -43.1729 },
        highlights: [
            { icon: "fa-cross", text: "Christ the Redeemer" },
            { icon: "fa-umbrella-beach", text: "Copacabana Beach" },
            { icon: "fa-mountain", text: "Sugarloaf Mountain" },
            { icon: "fa-mask", text: "Carnival Celebration" },
            { icon: "fa-futbol", text: "Football Culture" },
            { icon: "fa-tree", text: "Tijuca Forest" }
        ],
        tags: ["beaches", "vibrant", "scenic", "culture"]
    },
    {
        id: 8,
        name: "Sydney",
        country: "Australia",
        region: "oceania",
        activities: ["city", "beach"],
        description: "Australia's largest city features the iconic Sydney Opera House, Harbour Bridge, beautiful beaches like Bondi, and a perfect blend of urban and natural attractions.",
        rating: 4.7,
        image: "img/sydney.jpg",
        gallery: ["img/sydney-1.jpg", "img/sydney-2.jpg", "img/sydney-3.jpg"],
        coordinates: { lat: -33.8688, lng: 151.2093 },
        highlights: [
            { icon: "fa-landmark", text: "Sydney Opera House" },
            { icon: "fa-archway", text: "Harbour Bridge" },
            { icon: "fa-umbrella-beach", text: "Bondi Beach" },
            { icon: "fa-water", text: "Darling Harbour" },
            { icon: "fa-tree", text: "Royal Botanic Garden" },
            { icon: "fa-paw", text: "Taronga Zoo" }
        ],
        tags: ["iconic", "beaches", "harbor", "modern"]
    },
    {
        id: 9,
        name: "Machu Picchu",
        country: "Peru",
        region: "south-america",
        activities: ["adventure", "cultural"],
        description: "This ancient Incan citadel set high in the Andes Mountains is one of the world's most famous archaeological sites, offering breathtaking views and mysterious history.",
        rating: 4.9,
        image: "img/machu-picchu.jpg",
        gallery: ["img/machu-picchu-1.jpg", "img/machu-picchu-2.jpg", "img/machu-picchu-3.jpg"],
        coordinates: { lat: -13.1631, lng: -72.5450 },
        highlights: [
            { icon: "fa-mountain", text: "Andes Mountains" },
            { icon: "fa-hiking", text: "Inca Trail" },
            { icon: "fa-landmark", text: "Ancient Ruins" },
            { icon: "fa-history", text: "Incan History" },
            { icon: "fa-camera", text: "Spectacular Views" },
            { icon: "fa-train", text: "Scenic Train Ride" }
        ],
        tags: ["ancient", "hiking", "ruins", "bucket-list"]
    },
    {
        id: 10,
        name: "Dubai",
        country: "United Arab Emirates",
        region: "asia",
        activities: ["city", "adventure", "beach"],
        description: "A futuristic city known for its ultramodern architecture, luxury shopping, vibrant nightlife, and desert adventures. Home to Burj Khalifa, the world's tallest building.",
        rating: 4.6,
        image: "img/dubai.jpg",
        gallery: ["img/dubai-1.jpg", "img/dubai-2.jpg", "img/dubai-3.jpg"],
        coordinates: { lat: 25.2048, lng: 55.2708 },
        highlights: [
            { icon: "fa-building", text: "Burj Khalifa" },
            { icon: "fa-shopping-bag", text: "Luxury Shopping" },
            { icon: "fa-umbrella-beach", text: "Palm Jumeirah" },
            { icon: "fa-snowflake", text: "Ski Dubai" },
            { icon: "fa-desert", text: "Desert Safari" },
            { icon: "fa-water", text: "Dubai Fountain" }
        ],
        tags: ["luxury", "modern", "shopping", "desert"]
    },
    {
        id: 11,
        name: "Venice",
        country: "Italy",
        region: "europe",
        activities: ["cultural", "city"],
        description: "A unique city built on a lagoon with a network of canals instead of streets. Famous for its gondola rides, historic architecture, and romantic atmosphere.",
        rating: 4.7,
        image: "img/venice.jpg",
        gallery: ["img/venice-1.jpg", "img/venice-2.jpg", "img/venice-3.jpg"],
        coordinates: { lat: 45.4408, lng: 12.3155 },
        highlights: [
            { icon: "fa-water", text: "Grand Canal" },
            { icon: "fa-landmark", text: "St. Mark's Basilica" },
            { icon: "fa-ship", text: "Gondola Rides" },
            { icon: "fa-mask", text: "Venetian Masks" },
            { icon: "fa-bridge", text: "Rialto Bridge" },
            { icon: "fa-utensils", text: "Italian Cuisine" }
        ],
        tags: ["romantic", "canals", "historic", "unique"]
    },
    {
        id: 12,
        name: "Serengeti",
        country: "Tanzania",
        region: "africa",
        activities: ["adventure"],
        description: "One of the world's most famous wildlife sanctuaries, known for the annual Great Migration of wildebeest and zebra, and home to the Big Five animals.",
        rating: 4.9,
        image: "img/serengeti.jpg",
        gallery: ["img/serengeti-1.jpg", "img/serengeti-2.jpg", "img/serengeti-3.jpg"],
        coordinates: { lat: -2.3333, lng: 34.8333 },
        highlights: [
            { icon: "fa-paw", text: "Big Five Safari" },
            { icon: "fa-horse", text: "Great Migration" },
            { icon: "fa-campground", text: "Luxury Safari Camps" },
            { icon: "fa-hot-air-balloon", text: "Balloon Safaris" },
            { icon: "fa-camera", text: "Wildlife Photography" },
            { icon: "fa-sun", text: "Stunning Sunsets" }
        ],
        tags: ["wildlife", "safari", "nature", "photography"]
    }
];

// User data structure for traceability features
const userData = {
    profile: {
        username: "Guest",
        avatar: "img/default-avatar.png",
        joinDate: new Date().toISOString(),
        preferences: {
            favoriteRegions: [],
            favoriteActivities: [],
            travelStyle: ""
        }
    },
    journeyData: {
        visited: [],
        wishlist: [],
        timeline: []
    },
    stats: {
        placesVisited: 0,
        countriesVisited: new Set(),
        favoritesCount: 0,
        totalDistance: 0
    }
};

// Traceability data structure
class TravelTrace {
    constructor() {
        this.traces = [];
        this.currentTrace = null;
    }

    // Start a new trace for a destination
    startTrace(destinationId, action) {
        this.currentTrace = {
            traceId: this.generateTraceId(),
            destinationId: destinationId,
            action: action,
            startTime: new Date().toISOString(),
            endTime: null,
            events: [],
            metadata: {}
        };
        return this.currentTrace.traceId;
    }

    // Add an event to the current trace
    addEvent(eventType, details) {
        if (!this.currentTrace) return null;
        
        const event = {
            eventId: this.generateEventId(),
            eventType: eventType,
            timestamp: new Date().toISOString(),
            details: details
        };
        
        this.currentTrace.events.push(event);
        return event.eventId;
    }

    // End the current trace
    endTrace(status, notes) {
        if (!this.currentTrace) return null;
        
        this.currentTrace.endTime = new Date().toISOString();
        this.currentTrace.status = status;
        this.currentTrace.notes = notes || "";
        
        this.traces.push(this.currentTrace);
        const completedTrace = this.currentTrace;
        this.currentTrace = null;
        
        return completedTrace;
    }

    // Add metadata to the current trace
    addMetadata(key, value) {
        if (!this.currentTrace) return false;
        this.currentTrace.metadata[key] = value;
        return true;
    }

    // Get all traces for a specific destination
    getDestinationTraces(destinationId) {
        return this.traces.filter(trace => trace.destinationId === destinationId);
    }

    // Get all traces of a specific action type
    getActionTraces(action) {
        return this.traces.filter(trace => trace.action === action);
    }

    // Get a trace by its ID
    getTraceById(traceId) {
        return this.traces.find(trace => trace.traceId === traceId);
    }

    // Generate a unique trace ID
    generateTraceId() {
        return 'trace-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Generate a unique event ID
    generateEventId() {
        return 'event-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Export all traces as JSON
    exportTraces() {
        return JSON.stringify(this.traces);
    }

    // Import traces from JSON
    importTraces(jsonData) {
        try {
            const parsedData = JSON.parse(jsonData);
            if (Array.isArray(parsedData)) {
                this.traces = parsedData;
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error importing traces:", error);
            return false;
        }
    }

    // Get timeline of all traces
    getTimeline() {
        return this.traces.sort((a, b) => {
            return new Date(a.startTime) - new Date(b.startTime);
        });
    }

    // Get statistics about traces
    getStatistics() {
        const stats = {
            totalTraces: this.traces.length,
            actionCounts: {},
            destinationCounts: {},
            averageDuration: 0
        };

        // Count traces by action and destination
        this.traces.forEach(trace => {
            // Count by action
            if (!stats.actionCounts[trace.action]) {
                stats.actionCounts[trace.action] = 0;
            }
            stats.actionCounts[trace.action]++;

            // Count by destination
            if (!stats.destinationCounts[trace.destinationId]) {
                stats.destinationCounts[trace.destinationId] = 0;
            }
            stats.destinationCounts[trace.destinationId]++;

            // Calculate duration if trace is completed
            if (trace.endTime) {
                const duration = new Date(trace.endTime) - new Date(trace.startTime);
                stats.totalDuration = (stats.totalDuration || 0) + duration;
            }
        });

        // Calculate average duration
        if (stats.totalTraces > 0 && stats.totalDuration) {
            stats.averageDuration = stats.totalDuration / stats.totalTraces;
        }

        return stats;
    }
}

// Initialize the traceability system
const travelTracer = new TravelTrace();

// Export the data and traceability system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { destinations, userData, travelTracer };
}