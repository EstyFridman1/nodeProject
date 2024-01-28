export const addUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!userName || !email || !password)
            return res.status(404).send("mosoong required paramters username or password or email")
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send('password not valid')
        let hashedPassword = await bcrypt.hash(password, 15);

        let newUser = new User({ userName, password: hashedPassword, email });
        await newUser.save();
        let { _id, userName: y, roles, email: e } = newUser;
        let token = generateToken(newUser);
        res.json({ _id, roles, userName: y, token, email: e });
    }
    catch (err) {
        res.status(500).send("an error occured in....")
        
    }

}