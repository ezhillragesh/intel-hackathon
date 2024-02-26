import { useEffect, useState } from "react";

function AITutor() {
  const [link, setLink] = useState(
    "https://www.youtube.com/embed/A1uqgEz3hB0?si=kkicjm2FewM7XZ3T"
  );
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState({});
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/video/summary?urlink=${link}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        urlink: link,
      }),
    })
    .then((res) => res.json())
    .then((data)=>{
      setSummary(data.summary);
      setHistory({... [data.transcript, data.summary]})

    })
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return <>

  <iframe width="560" height="315" src={link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  

  {summary}

  <textarea onChange={(e)=>setPrompt(e.target.value)}/>
  <button onClick={handlePrompt()}>Send</button>


  </>;
}

export default AITutor;
