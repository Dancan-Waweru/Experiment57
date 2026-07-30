import dbPool from '../config/db.js';

/**
 * Validates credentials against the MySQL database.
 * Sends a JSON status response back to the client.
 */
export const validateLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Run a parameterized query to find an active user matching both criteria
        const [rows] = await dbPool.execute(
            'SELECT username, bundle_type FROM users WHERE username = ? AND password = ?',
            [username, password]
        );

        // Check if a matching record was found in the database matrix
        if (rows.length > 0) {
            console.log(`🟢 VALIDATION SUCCESS: User [ ${username} ] authorized.`);
            
            // Send back successful authorization status along with user profile metadata
            return res.status(200).json({
                success: true,
                username: rows[0].username,
                bundle: rows[0].bundle_type || '2 hour bundle'
            });
        } else {
            console.log(`⚠️ VALIDATION FAILURE: Bad credentials for username [ ${username} ].`);
            
            // Send unauthorized status back to the terminal framework
            return res.status(401).json({
                success: false,
                message: 'Invalid parameters detected.'
            });
        }
    } catch (error) {
        console.error('🔴 SYSTEM CRITICAL ERROR DURING VALIDATION ROUTINE:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal hardware core failure.'
        });
    }
};
