import axios from "axios";
import history from "../history";

// register a new user
export const registerUser = async (firstName, lastName, email, password) => {
  if (!firstName || !lastName || !email || !password) {
    alert("Please fill out all fields to sign up");
    return;
  }

  if (password.length < 7) {
    alert("Please ensure your password is at least 7 characters");
    return;
  }

  const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!validEmail.test(email)) {
    alert("Please enter in a valid email address");
    return;
  }

  await axios({
    method: "post",
    url: "http://localhost:3000/users",
    data: {
      name: `${firstName} ${lastName}`,
      email,
      password,
    },
  })
    .then((response) => {
      // TO-DO:
      // 1. Store JWT in user's browser session - DONE
      // 2. Redirect to user's home page. - DONE
      console.log(response);
      history.push("/");
    })
    .catch((error) => {
      if (!error) {
        console.log("Something bad just happened");
      }
      // fix later for better user experience
      alert("Sorry, no user found with those credentials. Please try again.");
      const errResponse = error.response.request.responseText;
      console.log(JSON.parse(errResponse).message);
    });
};

// read profile
export const readProfile = async () => {
  await axios({
    method: "get",
    withCredentials: true,
    url: "http://localhost:3000/users/me",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

// login user
export const loginUser = async (email, password) => {
  await axios({
    method: "post",
    withCredentials: true,
    url: "http://localhost:3000/users/login",
    data: {
      email,
      password,
    },
  })
    .then((response) => {
      console.log(response);
      history.push("/");
    })
    .catch((error) => {
      alert("Sorry, no user found with those credentials. Please try again.");
      console.log(error);
    });
};

// logout user
export const logoutUser = async () => {
  await axios({
    method: "post",
    withCredentials: true,
    url: "http://localhost:3000/users/logout",
  })
    .then((response) => {
      history.push("/login");
    })
    .catch((err) => {
      alert(
        "Sorry, there was an issue logging out your account. Please try again."
      );
    });
};

// logout all user sessions
export const logoutUserAllSessions = async () => {
  await axios({
    method: "post",
    withCredentials: true,
    url: "http://localhost:3000/users/logoutAll",
  })
    .then((response) => {
      history.push("/login");
    })
    .catch((err) => {
      alert(
        "Sorry, there was an issue logging out of your account. Please try again."
      );
    });
};

// read user tasks
export const readTasks = async () => {
  let readTasksPromise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3000/tasks",
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return await readTasksPromise;
};

// delete a task
export const deleteTask = async (taskID) => {
  let deleteTaskPromise = new Promise((resolve, reject) => {
    axios({
      method: "delete",
      withCredentials: true,
      url: `http://localhost:3000/tasks/${taskID}`,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return await deleteTaskPromise;
};

// update a task
export const updateTaskAsCompleted = async (taskID) => {
  let updateTaskPromise = new Promise((resolve, reject) => {
    axios({
      method: "patch",
      withCredentials: true,
      url: `http://localhost:3000/tasks/${taskID}`,
      data: {
        completed: true,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return updateTaskPromise;
};

// add new task
export const addTask = async (taskDescription) => {
  let addTaskPromise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      withCredentials: true,
      url: `http://localhost:3000/tasks`,
      data: {
        description: taskDescription,
        completed: false,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return addTaskPromise;
};
