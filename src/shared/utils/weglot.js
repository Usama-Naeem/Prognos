export const initializeWeglot = () => {
  const script = document.createElement("script");

  // write the script
  script.innerHTML = `
      Weglot.initialize({
          api_key: "${process.env.REACT_APP_WEGLOT_API_KEY}",
      });
    `;
  // append the script to the last of head
  document.head.appendChild(script);
};
