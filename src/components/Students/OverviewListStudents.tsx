import React from "react";
import image1 from "../../../public/image1 copy 2.png";
import image2 from "../../../public/image2 copy 2.png";
import image3 from "../../../public/image3 copy 2.png";
import image4 from "../../../public/image4 copy 2.png";
import image5 from "../../../public/image5 copy 2.png";

function OverviewListStudents() {
  return (
    <div>
      <div className="panel h-full w-full mt-11">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">
          List of the Last 5 Registered Students
          </h5>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="ltr:rounded-l-md rtl:rounded-r-md">Students</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                <td className="min-w-[150px] text-black dark:text-white">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover"
                      src={image1}
                      alt="avatar"
                    />
                    <span className="whitespace-nowrap">Amine Sabri</span>
                  </div>
                </td>
                <td className="text-primary">German </td>
              </tr>
              <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                <td className="text-black dark:text-white">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover"
                      src={image2}
                      alt="avatar"
                    />
                    <span className="whitespace-nowrap">Ayoub Lamine</span>
                  </div>
                </td>
                <td className="text-info">French </td>
              </tr>
              <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                <td className="text-black dark:text-white">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover"
                      src={image3}
                      alt="avatar"
                    />
                    <span className="whitespace-nowrap">Youness Jouti</span>
                  </div>
                </td>
                <td className="text-warning">English</td>
              </tr>
              <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                <td className="text-black dark:text-white">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover"
                      src={image4}
                      alt="avatar"
                    />
                    <span className="whitespace-nowrap">Souhail Benamar</span>
                  </div>
                </td>
                <td className="text-secondary">Full-Stack Mern</td>
              </tr>
              <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                <td className="text-black dark:text-white">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover"
                      src={image5}
                      alt="avatar"
                    />
                    <span className="whitespace-nowrap">Hassan Alaoui</span>
                  </div>
                </td>
                <td className="text-danger">Java</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OverviewListStudents;
