import React from "react";

const CoursePage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-6">
        <img
          src="https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b"
          alt="Classroom"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Khóa học ...
            </h2>
            <p>Mô tả khóa học</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">
              Giá giảm
              <span className="line-through text-gray-500">Giá gốc</span>{" "}
              <span className="text-green-600">XXX%</span>
            </p>
            <p className="text-gray-500 text-sm">Còn 11h55p</p>
            <button className="bg-gray-800 text-white px-6 py-2 rounded mt-2 hover:bg-gray-900">
              Mua ngay / Học ngay
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-2/3 pr-6">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-800">
                4 out of 5
              </span>
              <div className="ml-2">
                <span className="text-yellow-400">★★★★☆</span>
              </div>
              <span className="ml-2 text-gray-600">Top Rating</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-12 text-gray-600">5 Stars</span>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-black h-2 rounded"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-12 text-gray-600">4 Stars</span>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-black h-2 rounded"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-12 text-gray-600">3 Stars</span>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-black h-2 rounded"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-12 text-gray-600">2 Stars</span>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-black h-2 rounded"
                    style={{ width: "5%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-12 text-gray-600">1 Stars</span>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-black h-2 rounded"
                    style={{ width: "5%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Lina"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-bold">Lina</p>
                  <span className="text-yellow-400">★★★★☆</span>
                  <p className="text-gray-600">
                    Class, launched less than a year ago by Blackboard
                    co-founder Michael Chasen, integrates exclusively...
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Lina"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-bold">Lina</p>
                  <span className="text-yellow-400">★★★★☆</span>
                  <p className="text-gray-600">
                    Class, launched less than a year ago by Blackboard
                    co-founder Michael Chasen, integrates exclusively...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 pl-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              This Course Included
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Money Back
                Guarantee
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Access on all
                devices
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Certification of
                completion
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> 33 Modules
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Training 5 or more people
            </h3>
            <p className="text-gray-600">
              Class, launched less than a year ago by Blackboard co-founder
              Michael Chasen, integrates exclusively...
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Share this course
            </h3>
            <div className="flex justify-center space-x-4">
              <span className="text-blue-500">🐦</span>
              <span className="text-red-500">⭕</span>
              <span className="text-blue-300">📷</span>
              <span className="text-blue-700">💬</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePage;
