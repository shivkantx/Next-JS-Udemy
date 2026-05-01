import React from 'react'
import Link from 'next/link'

function Header() {
    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 50,
            background: 'rgba(26,20,16,0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid #3A2E24'
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
                .font-lora { font-family: 'Lora', Georgia, serif; }
                .font-dm { font-family: 'DM Sans', sans-serif; }

                .header-logo { transition: opacity 0.2s; }
                .header-logo:hover { opacity: 0.8; }

                .nav-link {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #A89880;
                    text-decoration: none;
                    padding: 6px 12px;
                    border-radius: 6px;
                    transition: color 0.15s, background 0.15s;
                }
                .nav-link:hover { color: #F5EDE4; background: rgba(196,149,106,0.1); }

                .btn-new {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    color: #1A1410;
                    background: linear-gradient(135deg, #C4956A, #E8B48A);
                    padding: 8px 18px;
                    border-radius: 999px;
                    text-decoration: none;
                    transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
                    box-shadow: 0 2px 12px rgba(196,149,106,0.3);
                }
                .btn-new:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(196,149,106,0.4);
                    filter: brightness(1.05);
                }
                .btn-new:active { transform: translateY(0); }

                .logo-mark {
                    width: 32px; height: 32px;
                    background: linear-gradient(135deg, #C4956A, #E8B48A);
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 2px 8px rgba(196,149,106,0.3);
                    transition: transform 0.2s;
                }
                .header-logo:hover .logo-mark { transform: rotate(-5deg) scale(1.05); }
            `}</style>

            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link href="/" className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div className="logo-mark">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="2" y="2" width="10" height="1.5" rx="0.75" fill="#1A1410" />
                            <rect x="2" y="6" width="7" height="1.5" rx="0.75" fill="#1A1410" />
                            <rect x="2" y="10" width="8.5" height="1.5" rx="0.75" fill="#1A1410" />
                        </svg>
                    </div>
                    <span className="font-lora" style={{ fontSize: '15px', color: '#F5EDE4', letterSpacing: '-0.3px' }}>my notes</span>
                </Link>

                {/* Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/notes/new" className="btn-new" style={{ marginLeft: '8px' }}>
                        + New note
                    </Link>
                </div>

            </div>
        </header>
    )
}

export default Header