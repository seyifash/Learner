import React from 'react';
import './home.css';
import card1 from '../assets/card1.PNG';
import card2 from '../assets/card2.PNG';
import card3 from '../assets/card3.PNG';
import pics from "../assets/newpics.png";
import user from '../assets/users.png'
import 'boxicons/css/boxicons.min.css';
import { Link } from 'react-router-dom';
import support from '../assets/support.PNG';
import man1 from '../assets/man1.PNG';

const Home = () => {
  return (
    <>
    <div className="body1">
        <h4 className="span1">BECOME A TEACHER</h4>
        <h1>Come Teach with Us</h1>
        <span className="span2">Teach and set exam questions without leaving your comfort zone</span>
        <div className="container">
            <div className="content1">
                <img src={pics} alt="ad-pics" />
                <div className="btn">
                <button><Link to="/sign-up" >Get started  &rarr;</Link></button>
                </div>
            </div>
            <div className="contentleft">
                <h2>&#x201C;</h2>
                <span>Join one of the worlds largest online learning platform</span>
                <h1>10k+</h1>
                <span>Teachers</span>
            </div>
            <div className="contentright">
                <div className="star">
                    <span><i class='bx bxs-star'></i></span>
                    <span><i class='bx bxs-star'></i></span>
                    <span><i class='bx bxs-star'></i></span>
                    <span><i class='bx bxs-star'></i></span>
                    <span><i class='bx bxs-star'></i></span>
                </div>
                <span className='span-2'>"Learners has made teaching easy for most programming teachers, you can teach students from the comfort of my home"</span>
                <span>Teachers</span>
            </div>
        </div>
    </div>
    <div className="contain5">
    <h6>Why Learners</h6>
    <h2>So Many Reasons To Start Here</h2>
    <p>Get, Set and Add questions for your students, with over 30 programming language</p>
    <ul className="cards">
        <li>
            <img src={card1}  alt="card-1"/>
            <h4>Teach Tech your Way</h4>
            <span>Publish questions you want, in the way you want and always have control over your own questions</span>
        </li>
        <li>
            <img src={card2} alt="card-2" />
            <h4>Inspire Learners</h4>
            <span> Teach what you know and help your students explore their interests, gain new skills and advance thier tech skills</span>
        </li>
        <li>
            <img src={card3}  alt="card-3"/>
            <h4>Inspire Learners</h4>
            <span>Teach what you know and help your students explore their interests, gain new skills and advance thier tech skills</span>
        </li>
    </ul>
    <div className="lang-cnt">
        <div className="cnt1">
            <h1>10K</h1>
            <span>Teachers</span>
        </div>
        <div className="cnt1">
            <h1>10K</h1>
            <span>language</span>
        </div>
        <div className="cnt1">
            <h1>75K</h1>
            <span>Enrollments</span>
        </div>
        <div className="cnt1">
            <h1>5K</h1>
            <span>Enrollments</span>
        </div>
    </div>
    </div>
    <div className="body3">
        <div className="part1">
            <span> LETS'S BEGIN</span>
            <h1>
                How To Begin Your Journey as A Teacher
            </h1>
            <Link to="/sign-up">Get Started</Link>
        </div>
        <div className="part2">
            <div className="lines">
                <div className='div-1'>
                    <div className='round'><h1>1</h1></div>
                </div>
                <div className='div-2'>
                    <div  className='round'><h1>2</h1></div>
                </div>
                <div className='div-3'>
                    <div  className='round'><h1>3</h1></div>
                </div>
                <div className='div-4'>
                </div>
            </div>
            <div className="Div-outer">
                <div className="Div-inner">
                    <h2>Plan Your Curriculum</h2>
                    <p>You start with your passion and knowledge. Then choose a promising topic wih 
                        the help of our ReadyMade Questions.The way that you teach-what you bring to it-is up to you.
                    </p>
                </div>
                <div className="Div-inner">
                    <h2>Set Your Question</h2>
                    <p>You start with your passion and knowledge. Then choose a promising topic wih 
                        the help of our ReadyMade Questions.The way that you teach-what you bring to it-is up to you.
                    </p>
                </div>
                <div className="Div-inner">
                    <h2>Give Exam question</h2>
                    <p>You start with your passion and knowledge. Then choose a promising topic wih 
                        the help of our ReadyMade Questions.The way that you teach-what you bring to it-is up to you.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div className="body4">
        <h5>TESTIMONY</h5>
        <h1>What Users Says</h1>
        <div className="testimony">
          <div className="comment4">
              <h1><i class='bx bxs-quote-left'></i></h1>
              <p>"I'm proud to wake up knowing that there is a channel to make life easy for me as a teacher
                where i have to worry myself about questions to give my students 
                or even worry about materials to give to student. I can do this from the comfort of my home anytime any day.
                i can be a teacher and still take on other jobs".
              </p>
              <h4>Osei Williams</h4>
              <span>Python Tutor</span>
          </div>
          <div className='picture4'>
              <div className='background'>
              </div>
              <img src={user} alt="user-1" />
          </div>
        </div>
    </div>
    <div className="body">
        <div className="body5">
            <div className="part1">
                <img src={support} alt="support" />
            </div>
            <div className="part2">
                <h6>GET SUPPORT</h6>
                <h1>You Wont Have To Do It Alone</h1>
                <p>Our Instructor Support Team is here to answer your questions and review your test video 
                    , while our Teaching Center gives you plenty of resources to help you through the process.
                    Plus, get the support of experienced instructors in our online community.</p>
                    <h6 className="h6">Learn More &#x2197;</h6>
            </div>
        </div>
        <div className="part3">
            <div className="pics">
                <img src={man1} alt="man-2" />
            </div>
            <div className="content">
                <h1>Become A Tutor Today</h1>
                <span>Join one of the world's largest online learning marketplaces.</span>
                <h6><Link to="/sign-up">Get Started &#8594;</Link></h6>
            </div>
        </div>
    </div>
    </>
  )
};

export default Home;
