import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

export default function SearchResult(props) {
  const [results, setResults] = useState({});
  const firstLoad = useRef(true);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    async function fetchData() {
      try {
        setError(false);
        setLoading(true);
        const url =
          "http://so718.sohost.pl/api.php?type=getSingleCode&code=" +
          props.code;
        const res = await axios(url);
        setResults(res.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [props.code]);

  if (props.code) {
    if (isError) {
      return (
        <div className="shadow-sm bg-body rounded text-center mt-3">
          <h3 className="p-2">No results for {props.code} found :(</h3>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="shadow-sm bg-body rounded text-center mt-3">
          <h3 className="p-2">Loading results for {props.code}</h3>
        </div>
      );
    } else {
      return (
        <div className="shadow-sm bg-body rounded text-center mt-3">
          <h3 className="p-2">Search results for {props.code}:</h3>
          <div className="">
            <CSVLink
              data={results}
              separator={";"}
              filename={props.code + ".csv"}
              className="btn btn-success"
            >
              Download CSV
            </CSVLink>
          </div>
          <div className="table-responsive">
            <table className="table mb-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Program</th>
                  <th scope="col">Component</th>
                  <th scope="col">Error</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map((e, index) => {
                  return (
                    <tr key={e.id}>
                      <td>{index + 1}</td>
                      <td>{e.qc_date}</td>
                      <td>{e.program}</td>
                      <td>{e.component}</td>
                      <td>{e.error}</td>
                      <td>{e.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}
