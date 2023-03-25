export default function UserForm(props) {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form.entries());
      console.log(formData);
      const res = await fetch('/api/user', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
      });
      const result = await res.json();
      console.log(result);
      props.onPlayGame();
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-8 w-2/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col mb-4">
                <label htmlFor="username" className="text-gray-300 font-bold mb-2">Enter Your Username</label>
                <input id="username" name="username" type="text" className="bg-gray-600 text-gray-300 border-2 border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-purple-500" autoComplete="off"/>
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="score" className="text-gray-300 font-bold mb-2">Your Current Score</label>
                <input id="score" name="score" type="number" defaultValue={0} className="bg-gray-600 text-gray-300 border-2 border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-purple-500" readOnly/>
            </div>
            <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded-full">Play Game</button>
        </form>
    )
}