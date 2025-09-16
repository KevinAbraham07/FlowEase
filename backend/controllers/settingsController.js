import User from "../models/user.js";

const saveGoogleCredentials = async (req, res) => {
    try{
        const {clientId, clientSecret, phoneNumber}=req.body;
        if (!clientId || !clientSecret){
             return res.status(400).json({ 
                success: false, message: "Client ID and Client Secret are required" 
            });
        }

    const userId = req.session?.user?._id;
    if (!userId){
        return res.status(401).json({ 
            success: false, 
            message: "Not logged in" 
        });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {clientId, clientSecret, phoneNumber},
      {new: true, runValidators: true}
    );

    res.status(200).json({
      success: true,
      message: "Credentials updated successfully",
      user,
    });
    } 
    catch (error){
        console.error("Error updating credentials:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};

export default {saveGoogleCredentials};
