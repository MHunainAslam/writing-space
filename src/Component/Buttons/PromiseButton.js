import { Button } from 'antd'
import React from 'react'

export const PromiseButton = ({ typ, title, loading }) => {
    return (
        <Button type="white" loading={loading} className={`${typ} h-100 py-2 w-100`}>{title}</Button>
    )
}
