import React from "react";
import { Nav } from "react-bootstrap";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
export default function AdminDashboard() {
  const { admin } = useUser();

  return (
    <Nav.Link as={NavLink} to='/dashboard'>
      {admin && <MdSpaceDashboard size={36} color='royalblue' />}
    </Nav.Link>
  );
}
