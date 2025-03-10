
import { BASE_URL } from "../utils/constants"

export const fetchTasks = async (token) => {
  const response = await fetch(`${BASE_URL}/api/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  return data;
};


export const updateTask = async (id,updateData,token) => {
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

export const deleteTask = async(id,token)=>{
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

export const addTask = async (task,token) => {
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
