import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-screen bg-[#161D29] py-12">
      <footer className="w-[80%] mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-center lg:flex-row lg:justify-between">

        {/* first div */}
          <div className="flex flex-col text-center lg:text-left md:flex-row justify-between w-full ">
            <div className="flex flex-col items-center gap-2">
              <img src={logo} alt="Logo" width="150px"></img>
              <p className="font-bold mt-2 text-[#AFB2BF]">Company</p>
              <div className="text-[#6E727F] flex flex-col gap-2 abbu">
                <Link className="hover-footer" to="/About">Affiliates</Link>
                <Link className="hover-footer" to="/Careers">Careers</Link>
                <Link className="hover-footer" to="/Affiliates">Affiliates</Link>
              </div>
              <div className="flex flex-row gap-4 justify-center text-[#AFB2BF] mt-2 text-xl">
                <FaFacebook className="hover-footer" />
                <FaGoogle className="hover-footer" />
                <FaTwitter className="hover-footer" />
                <FaYoutube className="hover-footer" />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-[#AFB2BF] mt-4 md:mt-0">Resourses</p>
                <div className="text-[#6E727F] flex flex-col gap-2">
                  <Link className="hover-footer" to="/About">Articles</Link>
                  <Link className="hover-footer" to="/Careers">Blog</Link>
                  <Link className="hover-footer" to="/Affiliates">Charge Sheet</Link>
                  <Link className="hover-footer" to="/Affiliates">Code challenges</Link>
                  <Link className="hover-footer" to="/Affiliates">Docs</Link>
                  <Link className="hover-footer" to="/Affiliates">Projects</Link>
                  <Link className="hover-footer" to="/Affiliates">Videos</Link>
                  <Link className="hover-footer" to="/Affiliates">Workspaces</Link>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <p className="font-bold text-[#AFB2BF]">Support</p>
                <div className="text-[#6E727F] flex flex-col gap-2">
                  <Link className="hover-footer" to="/About">Help Center</Link>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-[#AFB2BF] mt-4 md:mt-0">Plans</p>
                <div className="text-[#6E727F] flex flex-col gap-2">
                  <Link className="hover-footer" to="/About">Paid memberships</Link>
                  <Link className="hover-footer" to="/Careers">For student</Link>
                  <Link className="hover-footer" to="/Affiliates">Business Solutions</Link>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold mt-8 text-[#AFB2BF] ">Community</p>
                <div className="text-[#6E727F] flex flex-col gap-2">
                  <Link className="hover-footer" to="/About">Forums</Link>
                  <Link className="hover-footer" to="/About">Chapters</Link>
                  <Link className="hover-footer" to="/About">Events</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="divider">
          </div>

          <hr className="hidden md:block lg:hidden my-8 text-[#2C333F]"/>


          <div className="flex flex-col text-center lg:text-left md:flex-row w-full justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-[#AFB2BF] mt-4 md:mt-0">Subjects</p>
              <div className="text-[#6E727F] flex flex-col gap-2">
                <Link to="/al" className="hover-footer">Al</Link>
                <Link to="/cloud-computing" className="hover-footer">Cloud Computing</Link>
                <Link to="/code-foundations" className="hover-footer">Code Foundations</Link>
                <Link to="/computer-science" className="hover-footer">Computer Science</Link>
                <Link to="/cybersecurity" className="hover-footer">Cybersecurity</Link>
                <Link to="/data-analytics" className="hover-footer">Data Analytics</Link>
                <Link to="/data-science" className="hover-footer">Data Science</Link>
                <Link to="/data-visualization" className="hover-footer">Data Visualization</Link>
                <Link to="/developer-tools" className="hover-footer">Developer Tools</Link>
                <Link to="/devops" className="hover-footer">DevOps</Link>
                <Link to="/game-development" className="hover-footer">Game Development</Link>
                <Link to="/it" className="hover-footer">IT</Link>
                <Link to="/machine-learning" className="hover-footer">Machine Learning</Link>
                <Link to="/math" className="hover-footer">Math</Link>
                <Link to="/mobile-development" className="hover-footer">Mobile Development</Link>
                <Link to="/web-design" className="hover-footer">Web Design</Link>
                <Link to="/web-development" className="hover-footer">Web Development</Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-[#AFB2BF] mt-4 md:mt-0">Languages</p>
              <div className="text-[#6E727F] flex flex-col gap-2">
                <Link to="/bash" className="hover-footer">Bash</Link>
                <Link to="/c++" className="hover-footer">C++</Link>
                <Link to="/csharp" className="hover-footer">C#</Link>
                <Link to="/go" className="hover-footer">Go</Link>
                <Link to="/html-css" className="hover-footer">HTML & CSS</Link>
                <Link to="/java" className="hover-footer">Java</Link>
                <Link to="/javascript" className="hover-footer">JavaScript</Link>
                <Link to="/kotlin" className="hover-footer">Kotlin</Link>
                <Link to="/php" className="hover-footer">PHP</Link>
                <Link to="/python" className="hover-footer">Python</Link>
                <Link to="/r" className="hover-footer">R</Link>
                <Link to="/ruby" className="hover-footer">Ruby</Link>
                <Link to="/sql" className="hover-footer">SQL</Link>
                <Link to="/swift" className="hover-footer">Swift</Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-[#AFB2BF] mt-4 md:mt-0">Career building</p>
              <div className="text-[#6E727F] flex flex-col gap-2">
                <Link to="/career-paths" className="hover-footer">Career paths</Link>
                <Link to="/career-services" className="hover-footer">Career services</Link>
                <Link to="/interview-prep" className="hover-footer">Interview prep</Link>
                <Link to="/professional-certification" className="hover-footer">
                  Professional certification
                </Link>
                <Link to="/hi">-</Link>
                <Link to="/full-catalog" className="hover-footer">Full Catalog</Link>
                <Link to="/beta-content" className="hover-footer">Beta Content</Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 text-[#2C333F]"></hr>
        <div className="flex flex-col text-center lg:flex-row lg:justify-between text-[#AFB2BF]">
          <div>
            <span>Privacy policy</span>
            <span className="mx-2">|</span>
            <span>Cookie policy</span>
            <span className="mx-2">|</span>
            <span>Terms</span>
          </div>
          <p >Made with <span className="text-pink-200 text-lg">♥</span> Vishv © 2024 Studynotion</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
