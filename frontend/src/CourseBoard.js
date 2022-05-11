import React, { useRef, useState, useEffect } from 'react'
import Board from 'react-trello'
import './CourseBoard.css'

function CourseBoard() {

  const [tickets, setTickets] = useState()
  const fileRef = useRef();
  let eventBus = undefined

  const setEventBus = (handle) => {
    eventBus = handle
  }


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/assignment/get_assignments_by_student/${localStorage.getItem("userId")}`, {
      method: 'GET',
      //   mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(resData => {
        let temp = {};
        temp.lanes = resData.tickets;
        setTickets(temp)
      }).catch(error => console.log(error))
  }, [])


  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'To Do Assignments',
        style: { backgroundColor: 'white' },
        cards: [
          { id: 'Card1', title: 'ACS545', description: 'Lab 8: MD5 collision attack', label: '30mins' },
          { id: 'l1c2', title: 'ACS545', description: 'Lab 9', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane2',
        title: 'In Progress',
        style: { backgroundColor: 'white' },
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane3',
        title: 'Blocked',
        style: { backgroundColor: 'white' },
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' }
        ]
      },
      {
        id: 'lane4',
        style: { backgroundColor: 'white' },
        title: 'Completed',
        cards: []
      }
    ]
  }



  // const dataChanged = (newData) => {
  //   fetch('http://localhost:3001/api/sendNewData', {
  //     method: 'POST',
  //     //   mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ "tickets": newData })
  //   }).then(response => response.json())
  //     .then(resData => {
  //       setTickets(newData)
  //     }).catch(error => console.log(error))
  // }

  const changeStatus = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    debugger
    console.log(cardDetails)
    fetch(`http://localhost:3001/api/submissions/update/status/${cardDetails.id}`, {
      method: 'PUT',
      //   mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "status": targetLaneId })
    }).then(response => response.json())
      .then(resData => {
        // setTickets(r)
        console.log(resData)
      }).catch(error => console.log(error))
  }



  const handleFileUpload = id => e => {
    eventBus.publish({ type: 'MOVE_CARD', fromLaneId: 'IN PROGRESS', toLaneId: 'RESOLVED', cardId: 2, index: 0 })
    // debugger
    // console.log(id)
    // // const [file] = e.target.files;
    // // let base64OfFile = getBase64(file);
    // const formData = new FormData();
    // formData.append('file', e.target.files[0]);
    // // console.log(base64OfFile);
    // fetch(`http://localhost:3001/api/submissions/update/submit_file/${id}`, {
    //   method: 'PUT',
    //   //   mode: 'cors',
    //   headers: {
    //     'content-Type': 'multipart/form-data'
    //   },
    //   body: formData
    //   // body: JSON.stringify({"file:": base64OfFile})
    // }).then(response => response.json())
    //   .then(resData => {
    //     console.log("File sent!")
    //     eventBus.publish({ type: 'MOVE_CARD', fromLaneId: 'IN PROGRESS', toLaneId: 'RESOLVED', cardId: '2', index: 0 })
    //   }).catch(error => console.log(error))
  };


  const CustomCard = props => {
    console.log(props)
    return (
      <>
        <div className="card">
          <b className="propTitle">{props.title}</b>
          <b className="propLabel">{props.label}</b>
          <br />
          <p>{props.description}</p>
          <div>
            <button onClick={() => fileRef.current.click()}>
              Upload File(s)
            </button>
            <input
              ref={fileRef}
              onChange={handleFileUpload(props.id)}
              multiple={false}
              type="file"
              name="file"
              hidden
            />
          </div>

        </div>
      </>
    );
  };

  const components = {
    Card: CustomCard
  };

  console.log(tickets)
  return (
    <div style={{ height: "80px"}}>
      <h2 style={{ marginLeft: "31%"}}>Hello! Welcome to your assignment board</h2>
      {!!tickets && tickets.hasOwnProperty("lanes") &&
        <Board
          data={tickets}
          handleDragEnd={changeStatus}
          components={components}
          collapsibleLanes
          laneDraggable
          style={{ marginLeft: '5.5%', marginRight: '5.5%', height: '650px' }}
          className="board-card"
          eventBusHandle={setEventBus}
          cardStyle={{ backgroundColor: '#f1e11e' }}
          // handleDragEnd={changeStatus}
        >

        </Board>
      }
    </div>
  )
}
export default CourseBoard