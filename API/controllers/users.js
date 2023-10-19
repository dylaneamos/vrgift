const User = require('../models/users')

const getAllUsers = async (req, res) => {
    // console.log(req.user.id);
        try{
            if (req.user.isAdmin) {
                const users = await User.find();
                const usersWithoutPassword = users.map(user => {
                    const { password, ...userWithoutPassword } = user.toObject();
                    return userWithoutPassword;
                });
                res.status(200).json(usersWithoutPassword);
            } else {
                return res.status(200).json({'message':'unauthorized'})
            }
        } catch(error){
            return res.json({'message':'an error occurred'})
        }
    }

const SingleUser = async (req, res) => {
    if (req.params.id === req.user.id || req.user.isAdmin === true) {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(200).json({"message":"unauthorized"})
            }
            const {password, ...others} = user._doc
            return res.status(200).json(others)
        } catch (error) {
            res.status(200).json({"message":"an error occurred"})
        }
    }else{
        return res.status(200).json({"message": "unauthorized"})
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password } = req.body;

    // Validate the input
    if (!id || !email || !password) {
        return res.status(400).json({ message: 'All fields are required except email' });
    }

    // Find the customer in the database
    const customer = await Customer.findById(id);

    // If the customer does not exist, return an error
    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    // Update the customer's information
    customer.name = name;
    customer.address = address;

    // Save the updated customer to the database
    const updatedCustomer = await customer.save();

    // Return the updated customer
    res.json(updatedCustomer);
}

const deleteUSer = (req, res) => {
    res.json({'value':'user deleted'})
}

module.exports = {
    getAllUsers,
    SingleUser,
    updateUser,
    deleteUSer,
}