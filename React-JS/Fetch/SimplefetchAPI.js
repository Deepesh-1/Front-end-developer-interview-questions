useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error.message));
  }, []);
