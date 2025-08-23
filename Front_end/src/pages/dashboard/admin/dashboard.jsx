import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard = () => {
  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <i class="fas fa-users text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Total Students</p>
              <h3 class="font-bold text-2xl">2,548</h3>
              <p class="text-green-500 text-sm flex items-center">
                <i class="fas fa-arrow-up mr-1"></i> 12.5% from last month
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <i class="fas fa-book text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Total Courses</p>
              <h3 class="font-bold text-2xl">186</h3>
              <p class="text-green-500 text-sm flex items-center">
                <i class="fas fa-arrow-up mr-1"></i> 5 new this week
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <i class="fas fa-video text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Total Lessons</p>
              <h3 class="font-bold text-2xl">1,245</h3>
              <p class="text-green-500 text-sm flex items-center">
                <i class="fas fa-arrow-up mr-1"></i> 23 new today
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <i class="fas fa-dollar-sign text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Revenue</p>
              <h3 class="font-bold text-2xl">$24,780</h3>
              <p class="text-green-500 text-sm flex items-center">
                <i class="fas fa-arrow-up mr-1"></i> 8.2% from last month
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 grid-rows-4 xl:grid-rows-2">
          <div className="xl:col-span-2 col-span-3 bg-white py-5">
            <div className="flex py-2 px-10 justify-between">
              <p className="text-xl font-semibold capitalize ">
                student enrollment
              </p>
              <div className="flex gap-2">
                <p className="py-1 px-2 text-[#4D44CE] capitalize text-[12px] bg-[#E0E7FF]">
                  mothly
                </p>
                <p className="py-1 px-2 text-[#4D44CE] capitalize text-[12px] bg-[#E0E7FF]">
                  weekly
                </p>
                <p className="py-1 px-2 text-[#4D44CE] capitalize text-[12px] bg-[#E0E7FF]">
                  daily
                </p>
              </div>
            </div>
            <div>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                    color: "#bacaff",
                  },
                ]}
                height={300}
              />
            </div>
          </div>
          <div class="bg-white xl:col-span-1 col-span-3  rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Top Courses
            </h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="fas fa-code text-blue-600"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium">Web Development</h4>
                  <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <span class="text-xs text-gray-500">78%</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="fas fa-chart-line text-green-600"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium">Data Science</h4>
                  <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        class="bg-green-500 h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <span class="text-xs text-gray-500">65%</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="fas fa-mobile-alt text-purple-600"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium">Mobile App Dev</h4>
                  <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style={{ width: "52%" }}
                      ></div>
                    </div>
                    <span class="text-xs text-gray-500">52%</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="fas fa-paint-brush text-yellow-600"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium">UI/UX Design</h4>
                  <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        class="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <span class="text-xs text-gray-500">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white col-span-3 xl:col-span-2   rounded-lg shadow p-6 lg:col-span-2">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="p-2 bg-indigo-100 text-indigo-600 rounded-full mr-3">
                  <i class="fas fa-user-plus"></i>
                </div>
                <div>
                  <p class="font-medium">New student registration</p>
                  <p class="text-sm text-gray-500">
                    Michael Brown registered for Web Development course
                  </p>
                  <p class="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="p-2 bg-green-100 text-green-600 rounded-full mr-3">
                  <i class="fas fa-check-circle"></i>
                </div>
                <div>
                  <p class="font-medium">Course completion</p>
                  <p class="text-sm text-gray-500">
                    Emily Johnson completed Data Science Fundamentals
                  </p>
                  <p class="text-xs text-gray-400">5 hours ago</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
                  <i class="fas fa-comment"></i>
                </div>
                <div>
                  <p class="font-medium">New discussion</p>
                  <p class="text-sm text-gray-500">
                    David Wilson started a new discussion in Mobile App course
                  </p>
                  <p class="text-xs text-gray-400">Yesterday</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="p-2 bg-purple-100 text-purple-600 rounded-full mr-3">
                  <i class="fas fa-upload"></i>
                </div>
                <div>
                  <p class="font-medium">New content added</p>
                  <p class="text-sm text-gray-500">
                    Instructor uploaded new lesson to UI/UX Design course
                  </p>
                  <p class="text-xs text-gray-400">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white col-span-3 xl:col-span-1 rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Recent Students
            </h2>
            <div class="space-y-4">
              <div class="flex items-ce nter">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Student"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 class="font-medium">Michael Brown</h4>
                  <p class="text-sm text-gray-500">Web Development</p>
                </div>
                <div class="ml-auto text-xs text-gray-400">2h ago</div>
              </div>

              <div class="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/63.jpg"
                  alt="Student"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 class="font-medium">Sarah Miller</h4>
                  <p class="text-sm text-gray-500">Data Science</p>
                </div>
                <div class="ml-auto text-xs text-gray-400">5h ago</div>
              </div>

              <div class="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Student"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 class="font-medium">Robert Taylor</h4>
                  <p class="text-sm text-gray-500">Mobile App Dev</p>
                </div>
                <div class="ml-auto text-xs text-gray-400">1d ago</div>
              </div>

              <div class="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Student"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 class="font-medium">Jessica Lee</h4>
                  <p class="text-sm text-gray-500">UI/UX Design</p>
                </div>
                <div class="ml-auto text-xs text-gray-400">2d ago</div>
              </div>

              <div class="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/22.jpg"
                  alt="Student"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 class="font-medium">Daniel Wilson</h4>
                  <p class="text-sm text-gray-500">Web Development</p>
                </div>
                <div class="ml-auto text-xs text-gray-400">3d ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
