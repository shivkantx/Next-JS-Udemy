import React from 'react'
import Link from 'next/link'

function Footer() {
    return (
        <footer style={{ background: '#1A1410', borderTop: '1px solid #3A2E24', marginTop: 'auto' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
                .font-lora { font-family: 'Lora', Georgia, serif; }
                .font-dm   { font-family: 'DM Sans', sans-serif; }
                .f-link { color: #6B5A4A; font-size: 13px; text-decoration: none; transition: color 0.15s; font-family: 'DM Sans', sans-serif; }
                .f-link:hover { color: #C4956A; }
                .heart { display: inline-block; color: #C17B6F; animation: hb 1.4s ease-in-out infinite; }
                @keyframes hb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
                .footer-logo-mark {
                    width: 28px; height: 28px;
                    background: linear-gradient(135deg, #C4956A, #E8B48A);
                    border-radius: 7px;
                    display: flex; align-items: center; justify-content: center;
                }
                .divider-line {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #3A2E24, transparent);
                }
            `}</style>

            {/* Main footer */}
            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px 32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'space-between', marginBottom: '40px' }}>

                    {/* Brand */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                            <div className="footer-logo-mark">
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <rect x="2" y="2" width="10" height="1.5" rx="0.75" fill="#1A1410" />
                                    <rect x="2" y="6" width="7" height="1.5" rx="0.75" fill="#1A1410" />
                                    <rect x="2" y="10" width="8.5" height="1.5" rx="0.75" fill="#1A1410" />
                                </svg>
                            </div>
                            <span className="font-lora" style={{ fontSize: '15px', color: '#F5EDE4' }}>my notes</span>
                        </Link>
                        <p className="font-dm" style={{ fontSize: '12px', color: '#6B5A4A', maxWidth: '180px', lineHeight: '1.6' }}>
                            A quiet place to capture your thoughts, ideas, and memories.
                        </p>
                    </div>

                    {/* Navigate */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p className="font-dm" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#4A3C30', marginBottom: '4px' }}>Navigate</p>
                        <Link href="/" className="f-link">Home</Link>
                        <Link href="/notes/new" className="f-link">New note</Link>
                    </div>

                    {/* Quote */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
                        <p className="font-dm" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#4A3C30', marginBottom: '4px' }}>Thought</p>
                        <p className="font-lora" style={{ fontSize: '13px', fontStyle: 'italic', color: '#6B5A4A', lineHeight: '1.7' }}>
                            "The palest ink is better than the best memory."
                        </p>
                        <p className="font-dm" style={{ fontSize: '11px', color: '#4A3C30' }}>— Chinese proverb</p>
                    </div>

                </div>

                {/* Divider */}
                <div className="divider-line" style={{ marginBottom: '24px' }} />

                {/* Bottom bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <p className="font-dm" style={{ fontSize: '11px', color: '#4A3C30' }}>
                        © {new Date().getFullYear()} my notes. All rights reserved.
                    </p>
                    <p className="font-dm" style={{ fontSize: '11px', color: '#4A3C30' }}>
                        made with <span className="heart">♥</span> for your thoughts
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer