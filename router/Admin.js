const express = require("express");

const router = express.Router();

const controlAdmin = require("../controller/control-admin");

router.get("/admin", controlAdmin.getadmin);

router.get("/addDonar", controlAdmin.getAddDonar);

router.post("/addDonar", controlAdmin.postAddDonar);

router.get("/admin-DonarList", controlAdmin.getAdminDonarL);

router.post("/donarQ/:id/delete", controlAdmin.deleteQ);

router.post("/donar/:id/delete", controlAdmin.deleteD);

router.get("/analystics",controlAdmin.analystics);

router.get("/message", controlAdmin.message);

module.exports = router;
