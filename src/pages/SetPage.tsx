import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const SetPage = (props: Props) => {
  let { setid } = useParams();
  return <div>Set {setid}</div>;
};

export default SetPage;
