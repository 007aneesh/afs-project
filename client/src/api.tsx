const baseurl = process.env.REACT_APP_BASEURL;

interface Todo {
  status: string;
  content: string;
}

export async function create(data: Todo) {
  try {
    await fetch(`${baseurl}/addTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data.content, status: data.status }),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getAll() {
  try {
    let response = await fetch(`${baseurl}/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }


    return await data; 
  } catch (error) {
    console.error("Error fetching todos:", error); 
  }
}
export async function update(id: number, data: Todo) {
  try {
    let response = await fetch(`${baseurl}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result = await response.json();
    return result;
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

export async function remove(id: number) {
  try {
    await fetch(`${baseurl}/delete/${id}`, {
      method: "DELETE",
    });
    alert("Successfully removed!");
  } catch (err) {
    console.log(err);
  }
}
