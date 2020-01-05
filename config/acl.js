let checkAccess = (userRole, url) => {
    userAllowUrls = [
        '/user',
        '/test'
    ];
 
    try {
        if (userRole.toLowerCase() == 'admin') return true;
        if (userRole.toLowerCase() == 'user' && userAllowUrls.includes(url)) return true;
        
        return false;
        
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: 'Unauthorised Access'
        });
    }
}

module.exports = { checkAccess }