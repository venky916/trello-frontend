import { BASE_URL } from "../utils/constants"

const user = JSON.parse(localStorage.getItem("user"));
let token;
if (user && user.token) {
    token = user.token;
}


// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjg4MDk4YWYxYzg4MDI1NGVkZjIxZCIsImlhdCI6MTcyMzM4ODIwMSwiZXhwIjoxNzI1OTgwMjAxfQ.Ev7DZQd0_TZqb6aOH9_2JPJ043haF2mMU0xdksoEZ6w";

export const fetchTasks = async () => {
    const response = await fetch(`${BASE_URL}/api/tasks`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )
    if (!response.ok) {
        throw new Error("Failed to fetch tasks")
    }
    const data = await response.json();
    return data;
}

export const updateTask = async (id,updateData) => {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        }
    )
    if (!response.ok) {
        throw new Error("Failed to update Tasks")
    }
    const data = await response.json();
    return data
}

export const deleteTask = async(id)=>{
    const response  = await fetch(`${BASE_URL}/api/tasks/${id}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
        }
    );
    if(!response.ok){
        throw new Error("Failed to Delete Task")
    }
    const data = await response.json();
    return data;
}

export const addTask = async (task) => {
    try {
        const response = await fetch(`${BASE_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error("Failed to add task");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in addTask:", error.message);
        throw error;
    }
};
