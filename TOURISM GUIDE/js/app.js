// Main application JavaScript for Tourism Guide with Traceability

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');
const destinationContainer = document.getElementById('destinations-container');
const popularDestinationsContainer = document.querySelector('.destination-cards');
const destinationModal = document.getElementById('destination-modal');
const destinationDetails = document.getElementById('destination-details');
const closeModal = document.querySelector('.close-modal');
const searchInput = document.getElementById('destination-search');
const searchBtn = document.getElementById('search-btn');
const regionFilter = document.getElementById('region-filter');
const activityFilter = document.getElementById('activity-filter');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageIndicator = document.getElementById('page-indicator');
const startJourneyBtn = document.getElementById('start-journey');
const journeyTabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const addToVisitedBtn = document.getElementById('add-to-visited');
const addToWishlistBtn = document.getElementById('add-to-wishlist');
const shareDestinationBtn = document.getElementById('share-destination');
const exploreDestinationsBtn = document.getElementById('explore-destinations');
const discoverPlacesBtn = document.getElementById('discover-places');
const startTrackingBtn = document.getElementById('start-tracking');
const placesVisitedCounter = document.getElementById('places-visited');
const countriesVisitedCounter = document.getElementById('countries-visited');
const favoritesCounter = document.getElementById('favorites-count');
const sendMessageBtn = document.getElementById('send-message');

// Application State
let currentPage = 1;
let itemsPerPage = 6;
let filteredDestinations = [...destinations];
let currentDestination = null;

// Initialize the application
function initApp() {
    // Load user data from localStorage if available
    loadUserData();
    
    // Update statistics display
    updateStatistics();
    
    // Render popular destinations on home page
    renderPopularDestinations();
    
    // Render all destinations on destinations page
    renderDestinations();
    
    // Initialize export functionality
    initExportFunctionality();
    
    // Initialize visualization feature
    initVisualization();
    
    // Render journey data
    renderJourneyData();
    
    // Set up event listeners
    setupEventListeners();
}

// Load user data from localStorage
function loadUserData() {
    const savedUserData = localStorage.getItem('travelTrackUserData');
    if (savedUserData) {
        const parsedData = JSON.parse(savedUserData);
        userData.profile = parsedData.profile || userData.profile;
        userData.journeyData = parsedData.journeyData || userData.journeyData;
        userData.stats = parsedData.stats || userData.stats;
        
        // Convert Set from JSON
        if (userData.stats.countriesVisited && !userData.stats.countriesVisited instanceof Set) {
            userData.stats.countriesVisited = new Set(userData.stats.countriesVisited);
        }
    }
    
    // Load traces
    const savedTraces = localStorage.getItem('travelTrackTraces');
    if (savedTraces) {
        travelTracer.importTraces(savedTraces);
    }
    
    // Update UI with user data
    document.getElementById('username').textContent = userData.profile.username;
    document.getElementById('user-avatar').src = userData.profile.avatar;
}

// Save user data to localStorage
function saveUserData() {
    // Convert Set to Array for JSON serialization
    const dataToSave = JSON.parse(JSON.stringify(userData));
    dataToSave.stats.countriesVisited = Array.from(userData.stats.countriesVisited);
    
    localStorage.setItem('travelTrackUserData', JSON.stringify(dataToSave));
    localStorage.setItem('travelTrackTraces', travelTracer.exportTraces());
}

// Update statistics display
function updateStatistics() {
    placesVisitedCounter.textContent = userData.stats.placesVisited;
    countriesVisitedCounter.textContent = userData.stats.countriesVisited.size;
    favoritesCounter.textContent = userData.stats.favoritesCount;
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            changePage(targetPage);
        });
    });
    
    // Start Journey button
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', () => {
            changePage('destinations');
        });
    }
    
    // Search and filters
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            filterDestinations();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                filterDestinations();
            }
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', filterDestinations);
    }
    
    if (activityFilter) {
        activityFilter.addEventListener('change', filterDestinations);
    }
    
    // Pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderDestinations();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderDestinations();
            }
        });
    }
    
    // Modal close button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            destinationModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === destinationModal) {
            destinationModal.style.display = 'none';
        }
    });
    
    // Journey tabs
    journeyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            changeJourneyTab(tabId);
        });
    });
    
    // Destination actions
    if (addToVisitedBtn) {
        addToVisitedBtn.addEventListener('click', () => {
            if (currentDestination) {
                addToVisited(currentDestination);
            }
        });
    }
    
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', () => {
            if (currentDestination) {
                addToWishlist(currentDestination);
            }
        });
    }
    
    if (shareDestinationBtn) {
        shareDestinationBtn.addEventListener('click', () => {
            if (currentDestination) {
                shareDestination(currentDestination);
            }
        });
    }
    
    // Empty state buttons
    if (exploreDestinationsBtn) {
        exploreDestinationsBtn.addEventListener('click', () => {
            changePage('destinations');
        });
    }
    
    if (discoverPlacesBtn) {
        discoverPlacesBtn.addEventListener('click', () => {
            changePage('destinations');
        });
    }
    
    if (startTrackingBtn) {
        startTrackingBtn.addEventListener('click', () => {
            changePage('destinations');
        });
    }
    
    // Contact form
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
}

// Change active page
function changePage(pageId) {
    // Update navigation links
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update page visibility
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    // Track page view in traceability system
    travelTracer.startTrace('page', 'view');
    travelTracer.addMetadata('pageId', pageId);
    travelTracer.addEvent('pageView', { pageId: pageId, timestamp: new Date().toISOString() });
    travelTracer.endTrace('completed', 'User viewed ' + pageId + ' page');
    
    // Reset pagination when changing to destinations page
    if (pageId === 'destinations') {
        currentPage = 1;
        filterDestinations();
    }
}

// Change journey tab
function changeJourneyTab(tabId) {
    // Update tab buttons
    journeyTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update tab content visibility
    tabContents.forEach(content => {
        if (content.id === tabId) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Track tab change in traceability system
    travelTracer.startTrace('journey', 'tabChange');
    travelTracer.addMetadata('tabId', tabId);
    travelTracer.addEvent('tabChange', { tabId: tabId, timestamp: new Date().toISOString() });
    travelTracer.endTrace('completed', 'User viewed ' + tabId + ' tab');
}

// Filter destinations based on search and filters
function filterDestinations() {
    const searchTerm = searchInput.value.toLowerCase();
    const regionValue = regionFilter.value;
    const activityValue = activityFilter.value;
    
    // Start trace for filtering
    const traceId = travelTracer.startTrace('search', 'filter');
    travelTracer.addMetadata('searchTerm', searchTerm);
    travelTracer.addMetadata('regionFilter', regionValue);
    travelTracer.addMetadata('activityFilter', activityValue);
    
    filteredDestinations = destinations.filter(destination => {
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            destination.name.toLowerCase().includes(searchTerm) || 
            destination.country.toLowerCase().includes(searchTerm) || 
            destination.description.toLowerCase().includes(searchTerm) ||
            destination.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        // Region filter
        const matchesRegion = regionValue === '' || destination.region === regionValue;
        
        // Activity filter
        const matchesActivity = activityValue === '' || destination.activities.includes(activityValue);
        
        return matchesSearch && matchesRegion && matchesActivity;
    });
    
    // Reset to first page
    currentPage = 1;
    
    // Render filtered destinations
    renderDestinations();
    
    // End trace for filtering
    travelTracer.addEvent('filterResults', { resultCount: filteredDestinations.length });
    travelTracer.endTrace('completed', 'User filtered destinations');
}

// Render popular destinations on home page
function renderPopularDestinations() {
    if (!popularDestinationsContainer) return;
    
    // Get top 4 highest rated destinations
    const popularDests = [...destinations]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    
    popularDestinationsContainer.innerHTML = '';
    
    popularDests.forEach(destination => {
        const card = createDestinationCard(destination);
        popularDestinationsContainer.appendChild(card);
    });
}

// Render destinations with pagination
function renderDestinations() {
    if (!destinationContainer) return;
    
    destinationContainer.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDestinations = filteredDestinations.slice(startIndex, endIndex);
    
    // Update page indicator
    const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Enable/disable pagination buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    
    // Display message if no results
    if (paginatedDestinations.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'empty-state';
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <p>No destinations found matching your criteria.</p>
            <button id="reset-filters">Reset Filters</button>
        `;
        destinationContainer.appendChild(noResults);
        
        // Add event listener to reset filters button
        document.getElementById('reset-filters').addEventListener('click', () => {
            searchInput.value = '';
            regionFilter.value = '';
            activityFilter.value = '';
            filterDestinations();
        });
        
        return;
    }
    
    // Render destination cards
    paginatedDestinations.forEach(destination => {
        const card = createDestinationCard(destination);
        destinationContainer.appendChild(card);
    });
}

// Create a destination card element
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.setAttribute('data-id', destination.id);
    
    // Check if destination is in visited or wishlist
    const isVisited = userData.journeyData.visited.some(item => item.id === destination.id);
    const isWishlist = userData.journeyData.wishlist.some(item => item.id === destination.id);
    
    // Add classes for visited or wishlist
    if (isVisited) card.classList.add('visited');
    if (isWishlist) card.classList.add('wishlist');
    
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" class="destination-img">
        <div class="destination-info">
            <h3>${destination.name}, ${destination.country}</h3>
            <div class="destination-meta">
                <span>${destination.region.charAt(0).toUpperCase() + destination.region.slice(1)}</span>
                <span class="destination-rating">
                    <i class="fas fa-star"></i> ${destination.rating.toFixed(1)}
                </span>
            </div>
            <p class="destination-description">${destination.description}</p>
            <div class="destination-tags">
                ${destination.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add event listener to open modal
    card.addEventListener('click', () => {
        openDestinationModal(destination);
    });
    
    return card;
}

// Open destination modal with details
function openDestinationModal(destination) {
    currentDestination = destination;
    
    // Start trace for viewing destination details
    const traceId = travelTracer.startTrace(destination.id, 'view');
    travelTracer.addMetadata('destinationName', destination.name);
    travelTracer.addMetadata('destinationCountry', destination.country);
    
    // Check if destination is in visited or wishlist
    const isVisited = userData.journeyData.visited.some(item => item.id === destination.id);
    const isWishlist = userData.journeyData.wishlist.some(item => item.id === destination.id);
    
    // Update button text based on status
    addToVisitedBtn.innerHTML = isVisited ? 
        `<i class="fas fa-check"></i> Already Visited` : 
        `<i class="fas fa-check"></i> Mark as Visited`;
    
    addToWishlistBtn.innerHTML = isWishlist ? 
        `<i class="fas fa-heart"></i> Remove from Wishlist` : 
        `<i class="fas fa-heart"></i> Add to Wishlist`;
    
    // Disable button if already visited
    addToVisitedBtn.disabled = isVisited;
    
    // Populate modal content
    destinationDetails.innerHTML = `
        <div class="destination-header">
            <img src="${destination.image}" alt="${destination.name}" class="destination-header-img">
            <div class="destination-header-info">
                <h2>${destination.name}</h2>
                <div class="destination-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${destination.country}</span>
                </div>
                <div class="destination-rating-large">
                    <i class="fas fa-star"></i>
                    <span>${destination.rating.toFixed(1)} / 5.0</span>
                </div>
                <div class="destination-tags">
                    ${destination.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <p class="destination-description-full">${destination.description}</p>
        
        <div class="destination-gallery">
            ${destination.gallery.map(img => `<img src="${img}" alt="${destination.name}" class="gallery-img">`).join('')}
        </div>
        
        <div class="destination-details-section">
            <h3>Highlights</h3>
            <div class="highlights">
                ${destination.highlights.map(highlight => `
                    <div class="highlight-item">
                        <i class="fas ${highlight.icon}"></i>
                        <span>${highlight.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="destination-details-section">
            <h3>Location</h3>
            <div class="destination-map" id="destination-map">
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=${destination.coordinates.lat},${destination.coordinates.lng}&zoom=10&size=600x300&maptype=roadmap&markers=color:red%7C${destination.coordinates.lat},${destination.coordinates.lng}&key=YOUR_API_KEY" alt="Map" style="width:100%; height:100%;">
            </div>
        </div>
    `;
    
    // Show modal
    destinationModal.style.display = 'block';
    
    // Add event to trace
    travelTracer.addEvent('viewDetails', { 
        destinationId: destination.id,
        destinationName: destination.name,
        timestamp: new Date().toISOString()
    });
    
    // End trace
    travelTracer.endTrace('completed', 'User viewed details for ' + destination.name);
}

// Add destination to visited list
function addToVisited(destination) {
    // Start trace for adding to visited
    const traceId = travelTracer.startTrace(destination.id, 'addToVisited');
    travelTracer.addMetadata('destinationName', destination.name);
    
    // Check if already in visited list
    const isAlreadyVisited = userData.journeyData.visited.some(item => item.id === destination.id);
    
    if (!isAlreadyVisited) {
        // Create visited entry with timestamp
        const visitedEntry = {
            id: destination.id,
            name: destination.name,
            country: destination.country,
            image: destination.image,
            visitDate: new Date().toISOString(),
            notes: ""
        };
        
        // Add to visited list
        userData.journeyData.visited.push(visitedEntry);
        
        // Add to timeline
        userData.journeyData.timeline.push({
            type: 'visit',
            destinationId: destination.id,
            destinationName: destination.name,
            date: new Date().toISOString(),
            details: 'Marked as visited'
        });
        
        // Update statistics
        userData.stats.placesVisited++;
        userData.stats.countriesVisited.add(destination.country);
        
        // Remove from wishlist if present
        const wishlistIndex = userData.journeyData.wishlist.findIndex(item => item.id === destination.id);
        if (wishlistIndex !== -1) {
            userData.journeyData.wishlist.splice(wishlistIndex, 1);
            userData.stats.favoritesCount--;
        }
        
        // Save user data
        saveUserData();
        
        // Update UI
        updateStatistics();
        renderJourneyData();
        
        // Update button in modal
        addToVisitedBtn.innerHTML = `<i class="fas fa-check"></i> Already Visited`;
        addToVisitedBtn.disabled = true;
        
        // Show success message
        alert(`${destination.name} has been added to your visited places!`);
        
        // Add event to trace
        travelTracer.addEvent('addedToVisited', { 
            destinationId: destination.id,
            destinationName: destination.name,
            timestamp: new Date().toISOString()
        });
        
        // End trace
        travelTracer.endTrace('completed', 'User added ' + destination.name + ' to visited places');
    }
}

// Add destination to wishlist
function addToWishlist(destination) {
    // Start trace for wishlist action
    const traceId = travelTracer.startTrace(destination.id, 'wishlistAction');
    travelTracer.addMetadata('destinationName', destination.name);
    
    // Check if already in wishlist
    const wishlistIndex = userData.journeyData.wishlist.findIndex(item => item.id === destination.id);
    
    if (wishlistIndex === -1) {
        // Not in wishlist, add it
        const wishlistEntry = {
            id: destination.id,
            name: destination.name,
            country: destination.country,
            image: destination.image,
            addedDate: new Date().toISOString(),
            priority: 'medium'
        };
        
        // Add to wishlist
        userData.journeyData.wishlist.push(wishlistEntry);
        
        // Add to timeline
        userData.journeyData.timeline.push({
            type: 'wishlist',
            destinationId: destination.id,
            destinationName: destination.name,
            date: new Date().toISOString(),
            details: 'Added to wishlist'
        });
        
        // Update statistics
        userData.stats.favoritesCount++;
        
        // Update button in modal
        addToWishlistBtn.innerHTML = `<i class="fas fa-heart"></i> Remove from Wishlist`;
        
        // Show success message
        alert(`${destination.name} has been added to your wishlist!`);
        
        // Add event to trace
        travelTracer.addEvent('addedToWishlist', { 
            destinationId: destination.id,
            destinationName: destination.name,
            timestamp: new Date().toISOString()
        });
        
        // End trace
        travelTracer.endTrace('completed', 'User added ' + destination.name + ' to wishlist');
    } else {
        // Already in wishlist, remove it
        userData.journeyData.wishlist.splice(wishlistIndex, 1);
        
        // Add to timeline
        userData.journeyData.timeline.push({
            type: 'wishlist',
            destinationId: destination.id,
            destinationName: destination.name,
            date: new Date().toISOString(),
            details: 'Removed from wishlist'
        });
        
        // Update statistics
        userData.stats.favoritesCount--;
        
        // Update button in modal
        addToWishlistBtn.innerHTML = `<i class="fas fa-heart"></i> Add to Wishlist`;
        
        // Show success message
        alert(`${destination.name} has been removed from your wishlist!`);
        
        // Add event to trace
        travelTracer.addEvent('removedFromWishlist', { 
            destinationId: destination.id,
            destinationName: destination.name,
            timestamp: new Date().toISOString()
        });
        
        // End trace
        travelTracer.endTrace('completed', 'User removed ' + destination.name + ' from wishlist');
    }
    
    // Save user data
    saveUserData();
    
    // Update UI
    updateStatistics();
    renderJourneyData();
}

// Share destination
function shareDestination(destination) {
    // Start trace for sharing
    const traceId = travelTracer.startTrace(destination.id, 'share');
    travelTracer.addMetadata('destinationName', destination.name);
    
    // Create share text
    const shareText = `Check out ${destination.name}, ${destination.country} on TravelTrack! ${destination.description}`;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: `TravelTrack - ${destination.name}`,
            text: shareText,
            url: window.location.href
        })
        .then(() => {
            // Add event to trace
            travelTracer.addEvent('shared', { 
                destinationId: destination.id,
                destinationName: destination.name,
                method: 'webShareAPI',
                timestamp: new Date().toISOString()
            });
            
            // End trace
            travelTracer.endTrace('completed', 'User shared ' + destination.name);
        })
        .catch(error => {
            console.error('Error sharing:', error);
            fallbackShare();
            
            // Add event to trace
            travelTracer.addEvent('shareError', { 
                destinationId: destination.id,
                destinationName: destination.name,
                error: error.toString(),
                timestamp: new Date().toISOString()
            });
            
            // End trace
            travelTracer.endTrace('failed', 'Error sharing ' + destination.name);
        });
    } else {
        fallbackShare();
        
        // Add event to trace
        travelTracer.addEvent('shared', { 
            destinationId: destination.id,
            destinationName: destination.name,
            method: 'clipboard',
            timestamp: new Date().toISOString()
        });
        
        // End trace
        travelTracer.endTrace('completed', 'User shared ' + destination.name + ' via clipboard');
    }
    
    // Fallback share method
    function fallbackShare() {
        // Copy to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Share text copied to clipboard!');
    }
}

// Render journey data (visited, wishlist, timeline)
function renderJourneyData() {
    renderVisitedPlaces();
    renderWishlist();
    renderTimeline();
}

// Render visited places
function renderVisitedPlaces() {
    const visitedContainer = document.querySelector('.visited-places');
    if (!visitedContainer) return;
    
    // Clear container
    visitedContainer.innerHTML = '';
    
    // Check if there are visited places
    if (userData.journeyData.visited.length === 0) {
        visitedContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-map"></i>
                <p>You haven't marked any places as visited yet.</p>
                <button id="explore-destinations-empty">Explore Destinations</button>
            </div>
        `;
        
        // Add event listener to button
        const exploreBtn = document.getElementById('explore-destinations-empty');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                changePage('destinations');
            });
        }
        
        return;
    }
    
    // Sort visited places by date (newest first)
    const sortedVisited = [...userData.journeyData.visited].sort((a, b) => {
        return new Date(b.visitDate) - new Date(a.visitDate);
    });
    
    // Render each visited place
    sortedVisited.forEach(place => {
        const visitedCard = document.createElement('div');
        visitedCard.className = 'destination-card visited';
        visitedCard.setAttribute('data-id', place.id);
        
        const visitDate = new Date(place.visitDate);
        const formattedDate = visitDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        visitedCard.innerHTML = `
            <img src="${place.image}" alt="${place.name}" class="destination-img">
            <div class="destination-info">
                <h3>${place.name}, ${place.country}</h3>
                <div class="destination-meta">
                    <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                </div>
                <div class="visited-actions">
                    <button class="view-details-btn" data-id="${place.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="add-notes-btn" data-id="${place.id}">
                        <i class="fas fa-edit"></i> Add Notes
                    </button>
                </div>
            </div>
        `;
        
        visitedContainer.appendChild(visitedCard);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const destination = destinations.find(dest => dest.id === id);
            if (destination) {
                openDestinationModal(destination);
            }
        });
    });
    
    document.querySelectorAll('.add-notes-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const visitedPlace = userData.journeyData.visited.find(place => place.id === id);
            
            if (visitedPlace) {
                const notes = prompt('Add your notes about this place:', visitedPlace.notes || '');
                if (notes !== null) {
                    visitedPlace.notes = notes;
                    saveUserData();
                    alert('Notes saved successfully!');
                    
                    // Track in traceability system
                    travelTracer.startTrace(id, 'addNotes');
                    travelTracer.addMetadata('destinationName', visitedPlace.name);
                    travelTracer.addEvent('notesAdded', { 
                        destinationId: id,
                        destinationName: visitedPlace.name,
                        timestamp: new Date().toISOString()
                    });
                    travelTracer.endTrace('completed', 'User added notes for ' + visitedPlace.name);
                }
            }
        });
    });
}

// Render wishlist
function renderWishlist() {
    const wishlistContainer = document.querySelector('.wishlist-places');
    if (!wishlistContainer) return;
    
    // Clear container
    wishlistContainer.innerHTML = '';
    
    // Check if there are wishlist items
    if (userData.journeyData.wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty.</p>
                <button id="discover-places-empty">Discover Places</button>
            </div>
        `;
        
        // Add event listener to button
        const discoverBtn = document.getElementById('discover-places-empty');
        if (discoverBtn) {
            discoverBtn.addEventListener('click', () => {
                changePage('destinations');
            });
        }
        
        return;
    }
    
    // Sort wishlist by date added (newest first)
    const sortedWishlist = [...userData.journeyData.wishlist].sort((a, b) => {
        return new Date(b.addedDate) - new Date(a.addedDate);
    });
    
    // Render each wishlist item
    sortedWishlist.forEach(place => {
        const wishlistCard = document.createElement('div');
        wishlistCard.className = 'destination-card wishlist';
        wishlistCard.setAttribute('data-id', place.id);
        
        const addedDate = new Date(place.addedDate);
        const formattedDate = addedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        wishlistCard.innerHTML = `
            <img src="${place.image}" alt="${place.name}" class="destination-img">
            <div class="destination-info">
                <h3>${place.name}, ${place.country}</h3>
                <div class="destination-meta">
                    <span><i class="fas fa-calendar-plus"></i> Added: ${formattedDate}</span>
                </div>
                <div class="wishlist-actions">
                    <button class="view-details-btn" data-id="${place.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="mark-visited-btn" data-id="${place.id}">
                        <i class="fas fa-check"></i> Mark Visited
                    </button>
                </div>
            </div>
        `;
        
        wishlistContainer.appendChild(wishlistCard);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const destination = destinations.find(dest => dest.id === id);
            if (destination) {
                openDestinationModal(destination);
            }
        });
    });
    
    document.querySelectorAll('.mark-visited-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const destination = destinations.find(dest => dest.id === id);
            if (destination) {
                addToVisited(destination);
                renderJourneyData();
            }
        });
    });
}

// Render timeline
function renderTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    // Clear container
    timelineContainer.innerHTML = '';
    
    // Combine visited and wishlist events into timeline
    const timelineEvents = [];
    
    // Add visited places to timeline
    userData.journeyData.visited.forEach(place => {
        timelineEvents.push({
            type: 'visited',
            destinationId: place.id,
            destinationName: place.name,
            country: place.country,
            date: place.visitDate,
            image: place.image
        });
    });
    
    // Add wishlist items to timeline
    userData.journeyData.wishlist.forEach(place => {
        timelineEvents.push({
            type: 'wishlist',
            destinationId: place.id,
            destinationName: place.name,
            country: place.country,
            date: place.addedDate,
            image: place.image
        });
    });
    
    // Add custom timeline events
    if (userData.journeyData.timeline && userData.journeyData.timeline.length > 0) {
        userData.journeyData.timeline.forEach(event => {
            if (event.type !== 'visited' && event.type !== 'wishlist') {
                timelineEvents.push(event);
            }
        });
    }
    
    // Sort timeline by date (newest first)
    timelineEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Check if timeline is empty
    if (timelineEvents.length === 0) {
        timelineContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-route"></i>
                <p>Your journey timeline is empty.</p>
                <button id="start-tracking-empty">Start Tracking</button>
            </div>
        `;
        
        // Add event listener to button
        const startTrackingBtn = document.getElementById('start-tracking-empty');
        if (startTrackingBtn) {
            startTrackingBtn.addEventListener('click', () => {
                changePage('destinations');
            });
        }
        
        return;
    }
    
    // Render timeline events
    timelineEvents.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let eventContent = '';
        
        if (event.type === 'visited') {
            eventContent = `
                <div class="timeline-content">
                    <h3>Visited ${event.destinationName}</h3>
                    <p>You marked ${event.destinationName}, ${event.country} as visited.</p>
                    <button class="view-details-btn" data-id="${event.destinationId}">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                </div>
            `;
        } else if (event.type === 'wishlist') {
            eventContent = `
                <div class="timeline-content">
                    <h3>Added to Wishlist</h3>
                    <p>You added ${event.destinationName}, ${event.country} to your wishlist.</p>
                    <button class="view-details-btn" data-id="${event.destinationId}">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                </div>
            `;
        } else {
            eventContent = `
                <div class="timeline-content">
                    <h3>${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</h3>
                    <p>${event.details}</p>
                </div>
            `;
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-date">${formattedDate}</div>
            ${eventContent}
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.timeline-container .view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const destination = destinations.find(dest => dest.id === id);
            if (destination) {
                openDestinationModal(destination);
            }
        });
    });
}

// Initialize export functionality
function initExportFunctionality() {
    // Create export instance with traceability system
    const exportSystem = new TravelExport(travelTracer);
}

// Initialize visualization feature
function initVisualization() {
    // Add event listener for visualization link
    document.querySelectorAll('a[href="visualization.html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Record trace for visualization access
            travelTracer.addEvent('visualization', 'Accessed data visualization');
            
            // Save current user data to be available for visualization
            saveUserData();
        });
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);