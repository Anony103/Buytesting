export const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const isPasswordValid = password => password.length >= 8;

export const isPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
}

export const formatDateToLong = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Determine the suffix for the day (e.g., "th", "st", "nd", "rd")
    let daySuffix;
    if (day % 10 === 1 && day !== 11) {
        daySuffix = 'st';
    } else if (day % 10 === 2 && day !== 12) {
        daySuffix = 'nd';
    } else if (day % 10 === 3 && day !== 13) {
        daySuffix = 'rd';
    } else {
        daySuffix = 'th';
    }

    const formattedDate = `${day}${daySuffix} ${month}, ${year}`;
    return formattedDate;
}


export const formatDateToString = (dateString) => {
    // Parse the given date string
    const date = new Date(dateString);

    // Calculate the duration between the parsed date and the current date
    const currentDate = new Date();
    const diffMonths = (currentDate.getMonth() - date.getMonth()) + (12 * (currentDate.getFullYear() - date.getFullYear()));

    // Calculate years and months
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    // Construct the formatted string
    let formattedDate = '';
    if (years > 0) {
        formattedDate += `${years} year${years > 1 ? 's' : ''}`;
        if (months > 0) {
            formattedDate += ` ${months} month${months > 1 ? 's' : ''}`;
        }
    } else {
        formattedDate += `${months} month${months > 1 ? 's' : ''}`;
    }

    return formattedDate;
}


export const formatNumber = (number) => {
    if (number === undefined || number === null) {
        return "N/A"; // Return a default value or handle the error as needed
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const formatTimeAgo = (dateString) =>  {
    const currentDate = new Date();
    const date = new Date(dateString);
    const timeDifference = currentDate - date;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''}`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
}


export const formatDate = (dateString) => {
    // Create a new Date object from the ISO 8601 date string
    const date = new Date(dateString);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getUTCDate();

    const month = monthNames[date.getUTCMonth()];

    const year = date.getUTCFullYear();

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th'; // covers 11th through 20th
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;

    return formattedDate;
}

export const groupIntoChunks = (array, chunkSize) => {
    const result = [];
    for (let i = 0;i < array.length;i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export const currencyFormat = (num) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(parseInt(num));
}