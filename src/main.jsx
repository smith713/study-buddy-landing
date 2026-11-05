import React from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, ArrowRight, Check, Target, ChartNoAxesCombined, RotateCcw, Menu, X, Sparkles, ChevronRight, ArrowUp} from 'lucide-react';
import './style.css';
const courses=[{"name": "CompTIA A+", "label": "IT support", "badge": "cert-a-plus.png", "overview": "A+ covers the foundations of supporting computers and users. Earning the certification requires passing both Core 1 and Core 2.", "topics": ["Hardware, mobile devices, and networking basics", "Operating systems, security, and troubleshooting", "Professional support and operational procedures"], "why": "Build a foundation for diagnosing everyday technical issues and helping people use their devices. These skills are relevant to help desk and desktop support work.", "url": "https://www.comptia.org/en-us/certifications/a/"}, {"name": "CompTIA Network+", "label": "Networking", "badge": "cert-network-plus.png", "overview": "Network+ focuses on the knowledge needed to configure, maintain, and troubleshoot networks across different technologies.", "topics": ["Network connectivity and infrastructure", "Network operations and security", "Troubleshooting connection problems"], "why": "Understand how devices communicate and develop a structured approach to connectivity problems. Networking knowledge supports both IT support and infrastructure work.", "url": "https://www.comptia.org/en-us/certifications/network/"}, {"name": "CompTIA Security+", "label": "Cybersecurity", "badge": "cert-security-plus.png", "overview": "Security+ assesses foundational skills used to protect systems, identify threats, and manage security risks.", "topics": ["Threats, attacks, and vulnerabilities", "Access control and data protection", "Risk management and security practices"], "why": "Develop the security awareness needed to recognize risks and help protect users, systems, and information. It provides a foundation for further cybersecurity learning.", "url": "https://www.comptia.org/en-us/certifications/security/"}, {"name": "Microsoft Azure Fundamentals", "label": "AZ-900 \u00b7 Cloud fundamentals", "badge": "cert-azure.png", "overview": "AZ-900 assesses foundational knowledge of cloud computing and Microsoft Azure.", "topics": ["Cloud concepts", "Azure architecture and services", "Azure management and governance"], "why": "Learn the language of cloud computing and how core Azure services fit together. It is a starting point for exploring more advanced Azure learning paths.", "url": "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"}];
function Logo(){return <a className="logo" href="#top" aria-label="Study Buddy home"><img className="brand-logo" src={`${import.meta.env.BASE_URL}images/study-buddy-logo.png`} alt="Study Buddy book mascot logo"/><span>study<span className="gradient-text">buddy</span><small>LEARN. PRACTICE. GROW.</small></span></a>}
function Phones(){return <div className="showcase" aria-label="Study Buddy iPhone app screenshots"><div className="showcase-halo"/><div className="device device-back"><div className="device-top"/><img src={`${import.meta.env.BASE_URL}images/study-learn.jpeg`} alt="Study Buddy Security+ learning path showing course modules and quick review"/></div><div className="device device-front"><div className="device-top"/><img src={`${import.meta.env.BASE_URL}images/study-home-public.png`} alt="Study Buddy study plan dashboard with current track and start learning button"/></div><span className="showcase-caption">Real Study Buddy app screens</span></div>}
function MailerLiteForm(){
 const frameRef = React.useRef(null);
 const [height,setHeight] = React.useState(330);
 React.useEffect(()=>{
  const resize = (event) => {
   if(event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
   if(event.data?.type === 'studybuddy-form-height' && Number.isFinite(event.data.height)) setHeight(Math.max(220,Math.min(1200,event.data.height)));
  };
  window.addEventListener('message',resize);
  return ()=>window.removeEventListener('message',resize);
 },[]);
 return <div className="mailerlite-signup"><iframe ref={frameRef} className="signup-frame" title="Study Buddy email signup" src={`${import.meta.env.BASE_URL}signup.html?v=collected-layout-4`} style={{height}} /></div>;
}
function FeatureCarousel(){
 const track=React.useRef(null);
 const [active,setActive]=React.useState(0);
 const activeRef=React.useRef(0);
 const dialogRef=React.useRef(null);
 const [expanded,setExpanded]=React.useState(null);
 const features=[
  {title:'Learn in micro-lessons',description:'Build your understanding one topic at a time, with clear lessons that fit your schedule.',image:'benefit-memory.jpeg',alt:'Study Buddy memory aid explaining shared responsibility across cloud service models.',view:'memory'},
  {title:'Practice with purpose',description:'Learn why an answer is right—not just whether you got it right.',image:'benefit-question.jpeg',alt:'A cloud service model practice question with PaaS selected and an explanation of the correct answer.',view:'question'},
  {title:'Pick up where you left off',description:'Fit studying into your day. Save your place and return when you’re ready.',image:'benefit-practice-center.jpeg',alt:'Study Buddy Practice Center showing a paused Cloud Concepts session, Adaptive Practice, and the AZ-900 simulator.',view:'practice-center'},
  {title:'Strengthen what you know',description:'Check your understanding with active recall, chapter checkpoints, and resources for further learning.',image:'benefit-active-recall.jpeg',alt:'Active recall questions about Azure costs, a Microsoft Learn resource, and a chapter checkpoint checklist.',view:'active-recall'}
 ];
 const labels=features.map(feature=>feature.title);
 const openPreview=(feature)=>{setExpanded(feature);dialogRef.current.showModal();};
 React.useEffect(()=>{
  if(!expanded)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;};
 },[expanded]);
 const goTo=(index)=>{
  const node=track.current;
  if(!node)return;
  node.scrollTo({left:index*node.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 };
 React.useEffect(()=>{
  const node=track.current;
  const sync=()=>{activeRef.current=Math.max(0,Math.min(3,Math.round(node.scrollLeft/node.clientWidth)));setActive(activeRef.current);};
  const observer=new ResizeObserver(()=>node.scrollTo({left:activeRef.current*node.clientWidth,behavior:'instant'}));
  observer.observe(node);node.addEventListener('scroll',sync,{passive:true});
  return()=>{observer.disconnect();node.removeEventListener('scroll',sync);};
 },[]);
 return <div className="feature-carousel" role="region" aria-roledescription="carousel" aria-label="Study Buddy features">
  <div ref={track} className="feature-grid feature-slides" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();goTo(Math.max(0,Math.min(3,active+(event.key==='ArrowRight'?1:-1))));}}}>
{features.map((feature,index)=><article className="feature-card" key={feature.title} aria-label={`${index+1} of 4: ${feature.title}`}>
 <h3>{feature.title}</h3><p>{feature.description}</p>
 <button type="button" className="app-preview-button" onClick={()=>openPreview(feature)} aria-label={`Enlarge screenshot: ${feature.title}`}>
  <span className={`app-screenshot screenshot-${feature.view}`}><img src={`${import.meta.env.BASE_URL}images/${feature.image}`} alt={feature.alt} loading="lazy" /></span>
  <span className="enlarge-hint">Tap or click to enlarge</span>
 </button>
</article>)}
  </div><div className="feature-dots" aria-label="Choose a feature">{labels.map((label,index)=><button key={label} type="button" aria-label={`Show ${label}`} aria-current={index===active?'true':undefined} onClick={()=>goTo(index)}><span /></button>)}</div>
 <dialog ref={dialogRef} className="screenshot-dialog" aria-labelledby="screenshot-title" onClose={()=>setExpanded(null)} onClick={event=>{if(event.target===event.currentTarget)dialogRef.current.close();}}>
  {expanded&&<><div className="screenshot-dialog-header"><h3 id="screenshot-title">{expanded.title}</h3><button type="button" autoFocus onClick={()=>dialogRef.current.close()} aria-label="Close screenshot"><X size={24}/></button></div>
  <div className={`app-screenshot screenshot-${expanded.view}`}><img src={`${import.meta.env.BASE_URL}images/${expanded.image}`} alt={expanded.alt}/></div></>}
 </dialog>
 </div>;
}
function CertificationCards(){
 const modal=React.useRef(null);
 const [selected,setSelected]=React.useState(null);
 React.useEffect(()=>{
  if(!selected)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;};
 },[selected]);
 const open=(course)=>{setSelected(course);modal.current.showModal();};
 return <><div className="certification-grid">{courses.map(course=><button type="button" className="certification-card" key={course.name} aria-haspopup="dialog" onClick={()=>open(course)}>
 <span className="certification-logo"><img src={`${import.meta.env.BASE_URL}images/${course.badge}`} alt={`${course.name} badge`} loading="lazy"/></span>
 <h3>{course.name}</h3><span className="certification-label">{course.label}</span><span className="certification-more">Explore exam <ArrowRight size={15}/></span>
 </button>)}</div>
 <dialog ref={modal} className="certification-dialog" aria-labelledby="certification-title" onClose={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget)modal.current.close();}}>
 {selected&&<><div className="certification-dialog-top"><span>CHOOSE YOUR PATH</span><button autoFocus type="button" aria-label="Close exam information" onClick={()=>modal.current.close()}><X size={24}/></button></div>
 <h2 id="certification-title">{selected.name}</h2><p className="certification-dialog-label">{selected.label}</p>
 <h3>About the exam</h3><p>{selected.overview}</p><h3>What it covers</h3><ul>{selected.topics.map(topic=><li key={topic}>{topic}</li>)}</ul>
 <h3>Why it matters</h3><p>{selected.why}</p><a className="certification-source" href={selected.url} target="_blank" rel="noopener noreferrer">View official certification details <ArrowRight size={16}/></a>
 </>}
 </dialog></>;
}
function App(){const [menu,setMenu]=React.useState(false);return <div id="top"><header className="header"><div className="container nav"><Logo/><nav className={menu?'nav-links open':'nav-links'}><a onClick={()=>setMenu(false)} href="#features">Features</a><a onClick={()=>setMenu(false)} href="#courses">Courses</a><a onClick={()=>setMenu(false)} href="#how">How it works</a><a onClick={()=>setMenu(false)} href="#early-access" className="nav-cta">Get updates <ArrowRight size={15}/></a></nav><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></div></header><main><section className="hero"><div className="hero-glow"/><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR STUDY JOURNEY, SIMPLIFIED</div><h1>Big goals.<br/>Better study habits.<br/><span className="gradient-text">Meet your Study Buddy.</span></h1><p className="hero-desc">Your personal space to learn, practice, and build confidence for your next IT certification. One lesson, one quiz, one win at a time.</p><div className="hero-actions"><a className="btn primary" href="#early-access">Get launch updates <ArrowRight size={18}/></a><a className="btn secondary" href="#how">See how it works <ChevronRight size={18}/></a></div><div className="hero-note"><span className="avatar-stack"><i>📘</i><i>⚡</i><i>🎯</i></span><span>Made for curious minds and future IT pros.</span></div></div><Phones/></div></section><section id="features" className="section features-section"><div className="container"><div className="section-intro"><span className="section-kicker">EVERYTHING YOU NEED</span><h2>Less stress. <span className="gradient-text">More progress.</span></h2><p>Powerful study tools, without the overwhelm. Stay focused on what matters most: learning.</p></div><FeatureCarousel/></div></section><section id="courses" className="section courses-section"><div className="container"><div className="section-intro"><span className="section-kicker">CHOOSE YOUR PATH</span><h2>Your next certification <span className="gradient-text">starts here.</span></h2><p>Explore study paths built around popular entry-level and foundational IT certifications.</p></div><CertificationCards/><p className="course-disclaimer">Course availability and content may evolve as Study Buddy prepares for launch.</p></div></section><section id="how" className="section how-section"><div className="container how-grid"><div className="how-left"><span className="section-kicker">SIMPLE BY DESIGN</span><figure className="adaptive-shot"><img loading="lazy" src={`${import.meta.env.BASE_URL}images/study-buddy-phone-trio.png`} alt="Three Study Buddy iPhone app screens: My Courses, Learn, and Progress"/><figcaption>Explore Study Buddy: Courses, Learn, and Progress.</figcaption></figure></div><div className="how-right"><h2>A better way to <span className="gradient-text">show up for yourself.</span></h2><p>Whether you have five minutes or a full study session, Study Buddy helps you make the most of it.</p><div className="steps"><div><span>01</span><div><h3>Pick your certification</h3><p>Choose a course that fits your goals.</p></div></div><div><span>02</span><div><h3>Learn and practice</h3><p>Read lessons, take quizzes, and review explanations.</p></div></div><div><span>03</span><div><h3>Track your growth</h3><p>See your progress and decide what to study next.</p></div></div></div><a href="#early-access" className="text-link">Stay in the loop <ArrowRight size={17}/></a></div></div></section><section className="cta-section" id="early-access"><div className="container"><div className="cta-box"><span className="section-kicker">COMING TO IPHONE</span><h2>Your future is worth<br/><span>studying for.</span></h2><p>Study Buddy is preparing for its iPhone debut. Be ready to start your next learning chapter.</p><MailerLiteForm/><small className="form-note">Sign up to receive Study Buddy launch and course updates. Unsubscribe at any time.</small></div></div></section></main><footer><div className="container footer-inner"><Logo/><span>Built for the journey, not just the exam.</span><span>© {new Date().getFullYear()} Study Buddy</span></div></footer><a className="to-top" href="#top" aria-label="Return to top" title="Return to top"><ArrowUp size={22}/></a></div>};
createRoot(document.getElementById('root')).render(<App/>);
