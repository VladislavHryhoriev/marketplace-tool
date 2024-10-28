export const getTTNInfo = async (ttn: string) => {
  try {
    const response = await fetch("/api/nova-poshta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ttn }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};
