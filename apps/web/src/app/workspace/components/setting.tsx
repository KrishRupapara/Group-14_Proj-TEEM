// "use client";
// import React from 'react'
// import { useState, useEffect } from "react";
// import axios from "axios";
// // import { useParams } from 'react-router-dom'
// import { useParams } from 'next/navigation';


// export default function Setting(/*{
//     params,
//     searchParams,
//     }: {
//     params: { slug: string },
//     searchParams?: { [key: string]: string | string[] | undefined },
//     }*/) {

//   // const [hi, setHi] = useState("");

//   // const params = useParams();
//   // const id = params.id;

//   // useEffect(()=> {
//   //   setHi(id);
//   // },[])



//   const [workspace, setWorkspace] = useState({
//     title: "",
//     type: "",
//     description: "",
//     email: "",
//     Role: "",
//   });

//   // const { userId } = params;
//   // const { id } = useParams();
//   // const [values, setVa1uesJ = useState({
//   //   name:
//   //     email :

//   async function onFormSubmit() {

//     let title = workspace.title;
//     let type = workspace.type;
//     let description = workspace.description;
//     try {
//       const res = fetch("http://localhost:3500/api/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, type, description }),
//       }).then((res) => res.json());

//       // router.push("/dashboard");

//     } catch (err: any) {
//       console.log("Login failed", err.message);
//     }

//   };

//   useEffect(() => {
//     axios.get('http://localhost:3500/api/workspace/' + id)
//       .then(res => {
//         setWorkspace({ ...workspace, title: res.data.title, type: res.data.type, description: res.data.description })
//       }/*console.log(res)*/)
//       .catch(err => console.log(err))
//   }, [])

//   return (
//     <div className="w-screen h-[calc(100vh-7.9rem)] bg-gradient-to-b from-primaryblue to-white flex flex-row justify-between items-center">
//       <div className='w-1/3 mx-auto flex flex-col justify-around'>
//         <div className='flex flex-col justify-around'>
//           <h1 className='text-2xl mb-4 mx-auto'>Edit Workspace</h1>
//           <form action="" onSubmit={onFormSubmit}>
//             <div className='flex flex-col'>
//               <label htmlFor="name" id="name" className="font-bold mb-1">
//                 Worksace Name
//               </label>
//               <input
//                 id="Worksace name"
//                 placeholder="Worksace name"
//                 type="text"
//                 autoCapitalize="none"
//                 autoComplete="off"
//                 autoCorrect="off"
//                 className=" rounded-xl p-3"
//                 value={workspace.title}
//                 required

//                 onChange={(e) => {
//                   setWorkspace({
//                     ...workspace,
//                     title: e.target.value,
//                   });
//                 }}
//               />
//               <label htmlFor="Type" id="Type" className="font-bold mb-1 mt-2">
//                 Workspace Type
//               </label>
//               <select
//                 id="Workspace Type"
//                 required
//                 className="rounded-xl p-3"
//                 value={workspace.type}
//                 onChange={(t) =>
//                   setWorkspace({
//                     ...workspace,
//                     type: t.target.value,
//                   })
//                 }
//               >
//                 <option disabled selected>
//                   Choose a type
//                 </option>
//                 <option value="US">B2B Tech Startups</option>
//                 <option value="CA">B2C Tech Startups</option>
//                 <option value="CA">D2C E-Commerce</option>
//                 <option value="FR">Marketing Agencies</option>
//                 <option value="DE">Software Agencies</option>
//                 <option value="DE">Healthcare</option>
//                 <option value="DE">Education</option>
//                 <option value="DE">Retail</option>
//               </select>
//               <label htmlFor="Type" id="Type" className="font-bold mb-1 mt-2">
//                 Workspace Description
//               </label>

//               <textarea
//                 className="rounded-xl p-3"
//                 rows={4}
//                 placeholder="Write a brief description of your workspace"
//                 required
//                 value={workspace.description}
//                 onChange={(d) =>
//                   setWorkspace({
//                     ...workspace,
//                     description: d.target.value,
//                   })
//                 }

//               ></textarea>
              
              


//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
