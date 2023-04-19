const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const db = require("../data/database");

async function getadmin(req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  const user = await db
    .getdb()
    .collection("users")
    .findOne({ email: req.session.user.email });
  if (!user || !user.isAdmin) {
    res.status(403).render("401");
  }

  const collection = await db.getdb().collection("donorInfo");

  const q1 = { "bg.name": "A+" };
  const Ap = await collection.countDocuments(q1);

  const q2 = { "bg.name": "A-" };
  const An = await collection.countDocuments(q2);

  const q3 = { "bg.name": "B+" };
  const Bp = await collection.countDocuments(q3);

  const q4 = { "bg.name": "B-" };
  const Bn = await collection.countDocuments(q4);

  const q5 = { "bg.name": "O+" };
  const Op = await collection.countDocuments(q5);

  const q6 = { "bg.name": "O-" };
  const On = await collection.countDocuments(q6);

  const q7 = { "bg.name": "AB+" };
  const ABp = await collection.countDocuments(q7);

  const q8 = { "bg.name": "AB-" };
  const ABn = await collection.countDocuments(q8);

  const infos = await db
    .getdb()
    .collection("donorInfo")
    .find()
    .sort({ _id: 1 })
    .limit(10)
    .toArray();
  const count = await collection.countDocuments();
  res.render("admin", {
    Ap: Ap,
    An: An,
    Bp: Bp,
    Bn: Bn,
    Op: Op,
    On: On,
    ABp: ABp,
    ABn: ABn,
    infos: infos,
    count: count,
  });
}

async function getAddDonar(req, res) {
  const bgs = await db.getdb().collection("bg").find().toArray();
  const mandals = await db.getdb().collection("mandals").find().toArray();
  res.render("addDonar", { bgs: bgs, mandals: mandals });
}

async function postAddDonar(req, res) {
  const bgId = new ObjectId(req.body.bloodgroup);
  const mandalId = new ObjectId(req.body.mandal);

  const bg = await db.getdb().collection("bg").findOne({ _id: bgId });
  const mandal = await db
    .getdb()
    .collection("mandals")
    .findOne({ _id: mandalId });

  const newDonar = {
    name: req.body.fullname,
    mobileNo: req.body.mobileno,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    bg: {
      id: bgId,
      name: bg.name,
    },
    mandal: {
      id: mandalId,
      name: mandal.name,
    },
    address: req.body.address,
  };
  await db.getdb().collection("donorInfo").insertOne(newDonar);
  res.redirect("/admin-DonarList");
}

async function getAdminDonarL(req, res) {
  const infos = await db
    .getdb()
    .collection("donorInfo")
    .find()
    .sort({ _id: 1 })
    .limit(10)
    .toArray();
  res.render("admin-DonarList", { infos: infos });
}

async function deleteQ(req, res) {
  const donarId = new ObjectId(req.params.id);
  await db.getdb().collection("donorQuery").deleteOne({ _id: donarId });
  res.redirect("/message");
}

async function deleteD(req, res) {
  const donarId = new ObjectId(req.params.id);
  await db.getdb().collection("donorInfo").deleteOne({ _id: donarId });
  res.redirect("/admin-DonarList");
}

async function message(req, res) {

  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  const user = await db
    .getdb()
    .collection("users")
    .findOne({ email: req.session.user.email });
  if (!user || !user.isAdmin) {
    res.status(403).render("401");
  }
  const collection = await db.getdb().collection("donorInfo");

  const q1 = { "bg.name": "A+" };
  const Ap = await collection.countDocuments(q1);

  const q2 = { "bg.name": "A-" };
  const An = await collection.countDocuments(q2);

  const q3 = { "bg.name": "B+" };
  const Bp = await collection.countDocuments(q3);

  const q4 = { "bg.name": "B-" };
  const Bn = await collection.countDocuments(q4);

  const q5 = { "bg.name": "O+" };
  const Op = await collection.countDocuments(q5);

  const q6 = { "bg.name": "O-" };
  const On = await collection.countDocuments(q6);

  const q7 = { "bg.name": "AB+" };
  const ABp = await collection.countDocuments(q7);

  const q8 = { "bg.name": "AB-" };
  const ABn = await collection.countDocuments(q8);
  const infos = await db.getdb().collection("donorQuery").find().toArray();
  res.render("message", {
    infos: infos,
    Ap: Ap,
    An: An,
    Bp: Bp,
    Bn: Bn,
    Op: Op,
    On: On,
    ABp: ABp,
    ABn: ABn
  });
}

async function analystics(req,res){
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  const user = await db
    .getdb()
    .collection("users")
    .findOne({ email: req.session.user.email });
  if (!user || !user.isAdmin) {
    res.status(403).render("401");
  }
  const collection = await db.getdb().collection("donorInfo");

  const q1 = { "bg.name": "A+" };
  const Ap = await collection.countDocuments(q1);

  const q2 = { "bg.name": "A-" };
  const An = await collection.countDocuments(q2);

  const q3 = { "bg.name": "B+" };
  const Bp = await collection.countDocuments(q3);

  const q4 = { "bg.name": "B-" };
  const Bn = await collection.countDocuments(q4);

  const q5 = { "bg.name": "O+" };
  const Op = await collection.countDocuments(q5);

  const q6 = { "bg.name": "O-" };
  const On = await collection.countDocuments(q6);

  const q7 = { "bg.name": "AB+" };
  const ABp = await collection.countDocuments(q7);

  const q8 = { "bg.name": "AB-" };
  const ABn = await collection.countDocuments(q8);

  res.render("analystics",{Ap:Ap,An:An,
    Bp: Bp,
    Bn: Bn,
    Op: Op,
    On: On,
    ABp: ABp,
    ABn: ABn})
};

module.exports = {
  getadmin: getadmin,
  getAddDonar: getAddDonar,
  postAddDonar: postAddDonar,
  getAdminDonarL: getAdminDonarL,
  deleteQ: deleteQ,
  deleteD: deleteD,
  message: message,
  analystics:analystics
};
