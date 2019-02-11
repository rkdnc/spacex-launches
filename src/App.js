import React from 'react';
import './App.css';
import { GraphQLClient } from 'graphql-request';
import { useEffect, useState } from 'react';

const launchesQuery = `{
  launches(sort: "launch_date_utc", order: "ASC") {
    id
    launch_success
    mission_name
    launch_date_utc
    launch_site {
      site_name
    }
    rocket {
      rocket_name
    }
    details
    links {
      video_link
    }
  }
}`;

const client = new GraphQLClient('https://api.spacex.land/graphql/');

function useGraphQL(query) {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    client.request(query).then(
      data => {
        setState({ data, loading: false });
      },
      err => {
        console.error(err);
      }
    );
  }, [query]);

  return state;
}

function Header() {
  return (
    <div className="page-head">
      <h2 className="page-head-title text-center">Space X Launches</h2>
    </div>
  );
}

function Loading() {
  return (
    <div className="progress">
      <div
        className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
        role="progressbar"
        style={{ width: '100%' }}
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        Loading
      </div>
    </div>
  );
}

function Launches({ launches }) {
  const launchesByDate = launches.reduce((list, launch) => {
    const date = launch.launch_date_utc.slice(0, 4);
    list[date] = list[date] || [];
    list[date].push(launch);
    return list;
  }, {});

  return (
    <ul data-testid="launches" className="timeline timeline-variant">
      {Object.keys(launchesByDate).map(launchDate => (
        <span key={launchDate}>
          <li key={launchDate} className="timeline-month" >{launchDate}</li>
          {launchesByDate[launchDate].map(launch => (
            <Launch key={launch.flight_number} launch={launch} />
          ))}
        </span>
      ))}
    </ul>
  );
}

async function Launch({ launch }) {

  const launchIcon = launch.launch_success ? (
    <i className="icon mdi mdi-rocket" />
  ) : (
    <i className="icon mdi mdi-bomb" />
  );

  return (
    <li className="timeline-item timeline-item-detailed right">
      <div className="timeline-content timeline-type file">
        <div className="timeline-icon">{launchIcon}</div>

        <div className="timeline-header">
          <span className="timeline-autor">
            #{launch.id}: {launch.mission_name}
          </span>
          <p className="timeline-activity">
            {launch.rocket.rocket_name} &mdash; {launch.launch_site.site_name}
          </p>
          <span className="timeline-time">{launch.launch_date_utc.slice(0, 10)}</span>
        </div>
        <div className="timeline-summary">
          <p>{launch.details}</p>
        </div>
      </div>
    </li>
  );
}

// Create a new Component for comments
/* Component will live inside Launch component, will take the flight number from the parent and query the API for the corresponding comments */

// Need to re-write all of this, this is not as functional as I'd hoped.

 /*function Comments ({ flightNumber }) {

  const [flightNum, setComments] = useState(flightNumber)

  function getData() {
  const query = `{
    launchCommentsByFlightNumber(flightNumber: ${flightNumber}){
      items {
        id
        author
        body
        date
      }
    }
  }`

  const commentsEndpoint = 'https://pb3c6uzk5zhrzbcuhssogcpq74.appsync-api.us-east-1.amazonaws.com/graphql'

  const graphQLClient = new GraphQLClient(commentsEndpoint, {
    headers: {
      'x-api-key': 'da2-tadwcysgfbgzrjsfmuf7t4huui'
    }
  })

  const data =  graphQLClient.request(query).then( data => {
    setComments(data.launchCommentsByFlightNumber.items)
  })
  console.log(data)
  }

  return(
    <button type='button' onClick={() => setComments(flightNum, getData())}>View Comments</button>
    // Map over data.items for each author, body, and date (Don't forget to parse the date)
    // Render an error if there are no comments available (there are no comments up to #9 or so)
  )
} */


/*
 Create a new component for video renderer to parse url
Component will live inside launches, will take the parent URL from the query and parse it before feeding it to the component.
Component will take parsed/transformed URL from the 'watch?v=' to 'embed/' and then render the <video> tag.
Not sure if these will autoplay, may have to use YouTube's iFrame API if they autoplay (Because autoplay is awful)
 https://developers.google.com/youtube/iframe_api_reference */

export default function App() {
  const { data, loading } = useGraphQL(launchesQuery);


  return (
    <div>
      <Header />
      {loading ? <Loading /> : <Launches launches={data.launches} />}
    </div>
  );
}
