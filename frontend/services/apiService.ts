const API_URL = "http://127.0.0.1:8000";

export async function search(keyword: string): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(JSON.stringify(data, null, 2))
        return data;
    } catch (error) {
        console.error("Failed to fetch search results:", error);
        return null;
    }
}

export async function getImage(keyword: string): Promise<any> {
    const response = await fetch(`${API_URL}/image?keyword=${encodeURIComponent(keyword)}`);

    const data = await response.json();
    // console.log(data);
    return data;
}



