export  const errorHandling = (err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.send(err.message || "התרחשה תקלה")
}