const BASE_URL = 'http://localhost:5000/api'
const VERSION = 'v1'


export async function fetchTopicsFromAPI(visibility = true) {
    try {
        const response = await fetch(`${BASE_URL}/${VERSION}/items?visibility=${visibility}`);
        if (!response.ok) {
            throw new Error('Failed to fetch topics');
        }
        const topics = await response.json();
        return topics;
    } catch (error) {
        // console.error('Error fetching topics:', error.message);
        throw error
    }
}


export async function updateVisibilityInAPI(id, visibility) {
    try {
        const response = await fetch(`${BASE_URL}/${VERSION}/items/${id}?visibility=${visibility}`, {
            method: 'PATCH',
        });
        if (!response.ok) {
            throw new Error(`Failed to update visibility for topic with id ${id}`);
        }
        const updatedTopic = await response.json();
        return updatedTopic;
    } catch (error) {
        console.error(`Error updating visibility for topic with id ${id}:`, error.message);
        throw error;
    }
}

export async function createTopicInAPI(topicData) {
    try {
        console.log(topicData)
        const response = await fetch(`${BASE_URL}/${VERSION}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(topicData),
        });
        if (!response.ok) {
            throw new Error('Failed to create new topic');
        }
        const newTopic = await response.json();
        return newTopic;
    } catch (error) {
        console.error('Error creating new topic:', error.message);
        throw error;
    }
}

export async function updateTopicInAPI(id, topicData) {
    try {
        const response = await fetch(`${BASE_URL}/${VERSION}/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(topicData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update topic with id ${id}`);
        }
        const updatedTopic = await response.json();
        return updatedTopic;
    } catch (error) {
        console.error(`Error updating topic with id ${id}:`, error.message);
        throw error;
    }
}

export async function deleteTopicByIdInAPI(id) {
    try {
        const response = await fetch(`${BASE_URL}/${VERSION}/items/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete topic with id ${id}`);
        }
        const deletedTopic = await response.json();
        return deletedTopic;
    } catch (error) {
        console.error(`Error deleting topic with id ${id}:`, error.message);
        throw error;
    }
}


