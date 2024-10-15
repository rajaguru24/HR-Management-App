

// const BASE_URL = "https://hr-management-app.onrender.com"


export const GetAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_URL}/api?search=${search}&page=${page}&limit=${limit}`;
  try {
    const options = {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
export const GetEmployeeById = async (id) => {
  console.log(id)
  const url = `${BASE_URL}/api/${id}`;
  try {
    const options = {
      method: "GET",
      "Content-Type": "application/json",
    };

    const result = await fetch(url, options);
    const data  = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const CreateEmployee = async (empObj) => {
  const url = `${BASE_URL}/api`;
  try {
    const formData = new FormData();
    for (const key in empObj) {
      formData.append(key, empObj[key]);
      
    }
    const options = {
      method: "POST",
      body: formData,
    };

    const result = await fetch(url, options);
    const data = await result.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};
export const UpdateEmployeeById = async (empObj, id) => {
  const url = `${BASE_URL}/api${id}`;

  try {
  const formData = new FormData();
  
  for (const key in empObj) {
    formData.append(key, empObj[key]);
    
  }
  console.log(formData)
  const options = {
    method: "PUT",
    body: formData,
  };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
export const DeleteEmployeeById = async (id) => {

  const url = `${BASE_URL}/api${id}`
  try {
      const options = {
    method: "DELETE",
    "Content-Type": "application/json",
  };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
}
