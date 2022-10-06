import express from "express";

// importing routes
import contacts_routes from "../controllers/contacts";

const routes = (app: express.Application): void => {
    // exporting routes
    contacts_routes(app);
}

export default routes;
