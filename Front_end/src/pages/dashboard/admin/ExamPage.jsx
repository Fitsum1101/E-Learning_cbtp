import React from "react";

const ExamPage = () => {
  return (
    <div className="flex-1">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Exam Management</h1>
      </header>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Course
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Mathematics 101</option>
                <option>Physics 201</option>
                <option>Chemistry 301</option>
                <option>Biology 401</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Attempt Number
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>First Attempt</option>
                <option>Second Attempt</option>
                <option>Final Attempt</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Available Questions
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i
                  data-feather="search"
                  className="absolute left-3 top-3 text-gray-400"
                ></i>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 rounded-lg question-item flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium">What is the derivative of x²?</p>
                    <p className="text-sm text-gray-500">Calculus | 5 points</p>
                  </div>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg question-item flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium">
                      Solve the equation: 2x + 5 = 15
                    </p>
                    <p className="text-sm text-gray-500">Algebra | 3 points</p>
                  </div>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg question-item flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium">
                      What is the value of π to two decimal places?
                    </p>
                    <p className="text-sm text-gray-500">Geometry | 2 points</p>
                  </div>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg question-item flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium">
                      Explain the Pythagorean theorem
                    </p>
                    <p className="text-sm text-gray-500">Geometry | 4 points</p>
                  </div>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg question-item flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium">
                      What is the quadratic formula?
                    </p>
                    <p className="text-sm text-gray-500">Algebra | 3 points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Selected Questions
            </h2>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 rounded-lg selected-question flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      Find the limit of (sin x)/x as x approaches 0
                    </p>
                    <p className="text-sm text-gray-500">Calculus | 5 points</p>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <i data-feather="trash-2"></i>
                  </button>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg selected-question flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      Calculate the area of a circle with radius 5
                    </p>
                    <p className="text-sm text-gray-500">Geometry | 4 points</p>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <i data-feather="trash-2"></i>
                  </button>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg selected-question flex items-center justify-between">
                  <div>
                    <p className="font-medium">Differentiate y = e^x</p>
                    <p className="text-sm text-gray-500">Calculus | 3 points</p>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <i data-feather="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <p className="text-gray-700">
                Total Points: <span className="font-bold">12</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
