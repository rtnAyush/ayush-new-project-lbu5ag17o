'use client';

import { Button } from '@/components/ui/button';
import React from 'react'

const Links = () => {
    const [open, setOpen] = React.useState(false);

    const links = [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'About',
            url: '/about'
        },
        {
            name: 'Contact',
            url: '/contact'
        }
    ]

    const session = true;
    const isAdmin = true;

  return (
    <div>
        {session ? (
            <>
                {links.map((link, index) => (
                    <div key={index}>
                        {link.name}
                    </div>
                ))}
                <Button>Logout</Button>
            </>
            
        ): (
            <div>
                <div>Sign In</div>
                <div>Sign Up</div>
            </div>
        )}
        <Button onClick={() => setOpen(prev => !prev)}> Menu </Button>
        {
            open && (
                <div>
                    {
                        links.map((link, index) => (
                            <div key={index}>
                                {link.name}
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default Links;