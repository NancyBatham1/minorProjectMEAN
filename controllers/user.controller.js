export const superadminProfile = async(req, res)=>{
    return res.send('superadmin dash')
}

export const adminProfile = async(req, res)=>{
    return res.send('admin dash')
}

export const managerProfile = async(req, res)=>{
    return res.send('manager dash')
}

export const userProfile = async(req, res)=>{
    return res.send('user dash')
}