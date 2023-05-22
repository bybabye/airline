const url = "https://airline-gx52.onrender.com";

export const getLocation = async (payload, option = {}) => {
  const api = `${url}/location/list`;
  const res = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // token
      ...option,
    },
  });

  const data = await res.json();
 
  if (!res.ok) {
    if (res.status === 403) return null;
  }

  return data;
};

export const getFlight = async (payload, option = {}) => {
    const api = `${url}/flight/search`;
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // token
        ...option,
        
      },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
   
    if (!res.ok) {
      if (res.status === 403) return null;
    }
  
    return data;
  };
  
