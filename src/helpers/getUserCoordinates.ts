const getUserCoordinates = (): Promise<{ latitude: number; longitude: number } | null> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            resolve(null);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                console.error("Error getting location: ", error);
                resolve(null);
                return;
            }
        );
    });
};

export default getUserCoordinates;
