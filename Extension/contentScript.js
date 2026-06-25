(async () => {
 const body = await fetch("http://localhost:3000/actions/saveCardFromExtension", {
    method: "POST",
    headers:{
        "Content-Type": "Next/Static"
    },
    body: JSON.stringify({
        title: "Hello",
        url: "This is a test",
        description: "This is a test description",
    })
 })
})();

