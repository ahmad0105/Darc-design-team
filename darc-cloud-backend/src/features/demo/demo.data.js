// DARC Design Team — Enterprise Showcase Demo Dataset (Engineered for Hiring Managers & VIP Visitors)
// Completely isolated from production data. High-fidelity architectural & engineering projects.

export function createDemoDataset() {
  const now = new Date();
  const dateStr = (offsetDays) => new Date(Date.now() + offsetDays * 86400000).toISOString();

  const demoUsers = [
    {
      id: 'usr_demo',
      name: 'مدير التوظيف / زائر',
      nameEn: 'Hiring Manager / Guest',
      email: 'demo@darc-design.bond',
      jobTitleAr: 'مستعرض تجريبي (كامل الصلاحيات)',
      jobTitleEn: 'Demo Reviewer (Full Access)',
      roleId: 'admin',
      status: 'active',
      avatarColor: '#0d6269',
      avatarUrl: null
    },
    {
      id: 'usr_demo_arch',
      name: 'م. فهد القحطاني',
      nameEn: 'Eng. Fahad Al-Qahtani',
      email: 'fahad.q@darc.demo',
      jobTitleAr: 'رئيس قسم التصميم المعماري',
      jobTitleEn: 'Head of Architectural Design',
      roleId: 'discipline_lead',
      status: 'active',
      avatarColor: '#2563eb',
      avatarUrl: null
    },
    {
      id: 'usr_demo_int',
      name: 'نورة المنصور',
      nameEn: 'Noura Al-Mansoor',
      email: 'noura.m@darc.demo',
      jobTitleAr: 'كبيرة مهندسي الديكور والتأثيث',
      jobTitleEn: 'Senior Interior Design Engineer',
      roleId: 'discipline_lead',
      status: 'active',
      avatarColor: '#d97706',
      avatarUrl: null
    },
    {
      id: 'usr_demo_struct',
      name: 'م. طارق العلي',
      nameEn: 'Eng. Tariq Al-Ali',
      email: 'tariq.a@darc.demo',
      jobTitleAr: 'مهندس إنشائي معتمد',
      jobTitleEn: 'Chartered Structural Engineer',
      roleId: 'team_member',
      status: 'active',
      avatarColor: '#7c3aed',
      avatarUrl: null
    },
    {
      id: 'usr_demo_mep',
      name: 'م. حسام الدين',
      nameEn: 'Eng. Hossam El-Din',
      email: 'hossam.e@darc.demo',
      jobTitleAr: 'مهندس كهروميكانيك (MEP Lead)',
      jobTitleEn: 'Lead MEP Engineer',
      roleId: 'discipline_lead',
      status: 'active',
      avatarColor: '#059669',
      avatarUrl: null
    },
    {
      id: 'usr_demo_3d',
      name: 'كريم البغدادي',
      nameEn: 'Kareem Al-Baghdadi',
      email: 'kareem.b@darc.demo',
      jobTitleAr: 'فنان إظهار معماري ثلاثي الأبعاد (CGI/VR)',
      jobTitleEn: 'Lead 3D & VR Visualizer',
      roleId: 'team_member',
      status: 'active',
      avatarColor: '#db2777',
      avatarUrl: null
    }
  ];

  const demoProjects = [
    {
      id: 'prj_demo_villa',
      code: 'DARC-01',
      nameAr: 'فيلا نخلة جميرا الفاخرة (Palm Signature Villa)',
      nameEn: 'Palm Jumeirah Signature Villa',
      clientAr: 'مجموعة الفطيم العقارية',
      clientEn: 'Al Futtaim Real Estate Group',
      descriptionAr: 'قصر شاطئي معاصر بمساحة 2,400م² يجمع بين الواجهات الزجاجية الذكية والتكسيات الحجرية الفاخرة مع نظام أتمتة كامل وتنسيق حدائق مستدام.',
      descriptionEn: 'Contemporary beachfront mansion of 2,400m² combining smart glass facades, natural stone cladding, and full home automation.',
      lifecycle: 'active',
      health: 'on_track',
      startDate: dateStr(-45),
      dueDate: dateStr(60),
      managerId: 'usr_demo',
      progress: 82,
      progressMode: 'weighted',
      demo: true,
      createdAt: dateStr(-45),
      updatedAt: dateStr(-1),
      memberCount: 5,
      manager: { id: 'usr_demo', name: 'مدير التوظيف / زائر', nameEn: 'Hiring Manager / Guest' }
    },
    {
      id: 'prj_demo_tower',
      code: 'DARC-02',
      nameAr: 'برج الأفق التجاري الإداري (Skyline Commercial Tower)',
      nameEn: 'Skyline Commercial Business Tower',
      clientAr: 'شركة دار الأركان للاستثمار',
      clientEn: 'Dar Al Arkan Investment Co.',
      descriptionAr: 'برج إداري بارتفاع 34 طابقاً حائز على تقييم LEED Platinum الذهبي للاستدامة، يتضمن مكاتب ذكية ومساحات عمل مشتركة ومهبط طائرات مروحية.',
      descriptionEn: '34-story grade-A business tower targeting LEED Platinum sustainability certification with premium flexible workspaces.',
      lifecycle: 'active',
      health: 'at_risk',
      startDate: dateStr(-90),
      dueDate: dateStr(30),
      managerId: 'usr_demo_arch',
      progress: 68,
      progressMode: 'weighted',
      demo: true,
      createdAt: dateStr(-90),
      updatedAt: dateStr(-2),
      memberCount: 6,
      manager: { id: 'usr_demo_arch', name: 'م. فهد القحطاني', nameEn: 'Eng. Fahad Al-Qahtani' }
    },
    {
      id: 'prj_demo_resort',
      code: 'DARC-03',
      nameAr: 'منتجع ومحمية الساحل البيئي (Red Sea Eco-Resort)',
      nameEn: 'Red Sea Eco-Luxury Coastal Resort',
      clientAr: 'شركة البحر الأحمر للتطوير',
      clientEn: 'Red Sea Global Development',
      descriptionAr: 'منتجع سياحي فاخر يتضمن 45 شاليهاً فوق الماء وفندق بوتيك 5 نجوم مع محطة توليد طاقة شمسية مستقلة ومحطة تحلية مياه صديقة للبيئة.',
      descriptionEn: 'Ultra-luxury eco-resort featuring 45 overwater villas, boutique spa facilities, and zero-carbon solar microgrid.',
      lifecycle: 'active',
      health: 'on_track',
      startDate: dateStr(-120),
      dueDate: dateStr(90),
      managerId: 'usr_demo',
      progress: 91,
      progressMode: 'weighted',
      demo: true,
      createdAt: dateStr(-120),
      updatedAt: dateStr(-3),
      memberCount: 5,
      manager: { id: 'usr_demo', name: 'مدير التوظيف / زائر', nameEn: 'Hiring Manager / Guest' }
    },
    {
      id: 'prj_demo_hq',
      code: 'DARC-04',
      nameAr: 'المقر الإقليمي لشركة التقنية المالية (FinTech Regional HQ)',
      nameEn: 'FinTech Regional Headquarters',
      clientAr: 'صندوق الاستثمارات والتقنية',
      clientEn: 'Venture & Tech Growth Fund',
      descriptionAr: 'تصميم داخلي وتنفيذي فائق العصرية بمساحة 4,800م² يركز على بيئة العمل الهجينة (Hybrid Workspaces) ومختبرات الابتكار الرقمي.',
      descriptionEn: 'Modern interior design and fit-out package across 4,800m² accommodating collaborative hubs, trading floors, and executive suites.',
      lifecycle: 'completed',
      health: 'on_track',
      startDate: dateStr(-180),
      dueDate: dateStr(-10),
      managerId: 'usr_demo_int',
      progress: 100,
      progressMode: 'weighted',
      demo: true,
      createdAt: dateStr(-180),
      updatedAt: dateStr(-10),
      memberCount: 4,
      manager: { id: 'usr_demo_int', name: 'نورة المنصور', nameEn: 'Noura Al-Mansoor' }
    }
  ];

  const demoTasks = [
    // Villa Tasks
    {
      id: 'tsk_demo_01',
      projectId: 'prj_demo_villa',
      titleAr: 'المخططات المعمارية التنفيذية الكاملة (Detailed Architectural Package)',
      titleEn: 'Detailed Architectural Working Drawings',
      descriptionAr: 'إعداد المساقط الأفقية والواجهات والقطاعات التفصيلية لجميع أدوار الفيلا بما يشمل تفاصيل العزل والتشطيبات.',
      descriptionEn: 'Complete architectural layout plans, building elevations, and construction cross-sections with material callouts.',
      status: 'done',
      priority: 'high',
      weight: 15,
      progress: 100,
      assigneeId: 'usr_demo_arch',
      reviewerId: 'usr_demo',
      startDate: dateStr(-40),
      dueDate: dateStr(-15),
      createdAt: dateStr(-40),
      updatedAt: dateStr(-15)
    },
    {
      id: 'tsk_demo_02',
      projectId: 'prj_demo_villa',
      titleAr: 'مخططات الأسقف المعلقة وتوزيع الإنارة الذكية (Reflected Ceiling & Lighting)',
      titleEn: 'Reflected Ceiling Plans & Smart Lighting',
      descriptionAr: 'تنسيق مجاري التكييف المخفي وتوزيع سبوتات الإنارة المخفية وأنظمة الصوت الحائطي ومستشعرات الحركة.',
      descriptionEn: 'Coordination of ducted AC grilles, linear architectural lighting, acoustic plaster, and presence sensors.',
      status: 'review',
      priority: 'urgent',
      weight: 12,
      progress: 80,
      assigneeId: 'usr_demo_int',
      reviewerId: 'usr_demo',
      startDate: dateStr(-20),
      dueDate: dateStr(3),
      createdAt: dateStr(-20),
      updatedAt: dateStr(-1)
    },
    {
      id: 'tsk_demo_03',
      projectId: 'prj_demo_villa',
      titleAr: 'تصاميم الإظهار المعماري والواقع الافتراضي 3D (Photorealistic CGI & VR Walkthrough)',
      titleEn: '3D Photorealistic Renders & VR Tour',
      descriptionAr: 'رندرات فائقة الدقة 4K للمجلس الرئيسي وغرفة المعيشة والواجهة الخارجية والحديقة المائية.',
      descriptionEn: '4K photorealistic architectural CGI visualizations for main majlis, master suite, and exterior landscape.',
      status: 'done',
      priority: 'medium',
      weight: 10,
      progress: 100,
      assigneeId: 'usr_demo_3d',
      reviewerId: 'usr_demo_int',
      startDate: dateStr(-30),
      dueDate: dateStr(-5),
      createdAt: dateStr(-30),
      updatedAt: dateStr(-5)
    },
    {
      id: 'tsk_demo_04',
      projectId: 'prj_demo_villa',
      titleAr: 'مخططات شبكة التكييف المركزي والمياه (HVAC & Plumbing Engineering)',
      titleEn: 'HVAC Ductwork & Plumbing Schematics',
      descriptionAr: 'حساب الأحمال الحرارية واختيار وحدات VRF ومسارات التغذية والصرف وتفاصيل حوض السباحة المتدفق.',
      descriptionEn: 'Cooling load calculations, VRF equipment schedules, pipe routing, and infinity pool filtration design.',
      status: 'in_progress',
      priority: 'high',
      weight: 10,
      progress: 50,
      assigneeId: 'usr_demo_mep',
      reviewerId: 'usr_demo_arch',
      startDate: dateStr(-10),
      dueDate: dateStr(15),
      createdAt: dateStr(-10),
      updatedAt: dateStr(-1)
    },
    {
      id: 'tsk_demo_05',
      projectId: 'prj_demo_villa',
      titleAr: 'جدول تشطيبات المواد واختيار الرخام والخشب (FF&E Specification Schedule)',
      titleEn: 'Interior FF&E Finishes & Specifications',
      descriptionAr: 'اعتماد عينات الرخام الإيطالي كلكتا، وألواح الخشب الجوزي الطبيعي، والأقمشة المقاومة للبقع.',
      descriptionEn: 'Selection schedule for Calacatta marble, American walnut paneling, and custom joinery detailing.',
      status: 'approval',
      priority: 'high',
      weight: 8,
      progress: 80,
      assigneeId: 'usr_demo_int',
      reviewerId: 'usr_demo',
      startDate: dateStr(-5),
      dueDate: dateStr(7),
      createdAt: dateStr(-5),
      updatedAt: dateStr(-1)
    },

    // Tower Tasks
    {
      id: 'tsk_demo_06',
      projectId: 'prj_demo_tower',
      titleAr: 'دراسة الرياح والتحليل الإنشائي للأبراج العالية (Wind Tunnel & Seismic Modeling)',
      titleEn: 'Wind Tunnel Testing & Seismic Structural Analysis',
      descriptionAr: 'محاكاة قوى الرياح والزلازل بالاعتماد على برمجيات ETABS و SAFE للتأكد من جساءة النواة الخرسانية.',
      descriptionEn: 'Dynamic structural wind load simulation and lateral drift checks for concrete core shear walls.',
      status: 'done',
      priority: 'urgent',
      weight: 20,
      progress: 100,
      assigneeId: 'usr_demo_struct',
      reviewerId: 'usr_demo_arch',
      startDate: dateStr(-80),
      dueDate: dateStr(-40),
      createdAt: dateStr(-80),
      updatedAt: dateStr(-40)
    },
    {
      id: 'tsk_demo_07',
      projectId: 'prj_demo_tower',
      titleAr: 'تفاصيل الواجهات الزجاجية المزدوجة (Unitized Curtain Wall Facade)',
      titleEn: 'Unitized Curtain Wall Engineering & Thermal Analysis',
      descriptionAr: 'تصميم قطاعات الألمنيوم الحرارية المانعة للتسرب والزجاج المزدوج Low-E مع دراسة التمدد الحراري.',
      descriptionEn: 'Engineering unitized curtain wall cassettes, thermal breaks, acoustic seals, and anchor brackets.',
      status: 'in_progress',
      priority: 'urgent',
      weight: 18,
      progress: 50,
      assigneeId: 'usr_demo_arch',
      reviewerId: 'usr_demo',
      startDate: dateStr(-25),
      dueDate: dateStr(10),
      createdAt: dateStr(-25),
      updatedAt: dateStr(-2)
    },
    {
      id: 'tsk_demo_08',
      projectId: 'prj_demo_tower',
      titleAr: 'نظام إدارة المبنى الذكي ومكافحة الحريق (BMS & Fire Life Safety Strategy)',
      titleEn: 'Building Management System & Fire Safety Strategy',
      descriptionAr: 'مخططات مصاعد الهروب السريعة ومضخات الحريق وشبكة المرشات الأوتوماتيكية مع غرف التحكم الرئيسية.',
      descriptionEn: 'High-rise evacuation lifts, fire pump sizing, sprinkler riser diagrams, and central BMS telemetry.',
      status: 'review',
      priority: 'high',
      weight: 15,
      progress: 80,
      assigneeId: 'usr_demo_mep',
      reviewerId: 'usr_demo_arch',
      startDate: dateStr(-15),
      dueDate: dateStr(5),
      createdAt: dateStr(-15),
      updatedAt: dateStr(-1)
    },

    // Eco Resort Tasks
    {
      id: 'tsk_demo_09',
      projectId: 'prj_demo_resort',
      titleAr: 'المخطط العام وتوزيع الشاليهات البحرية (Master Plan & Overwater Jetty)',
      titleEn: 'Coastal Master Plan & Overwater Jetty Layout',
      descriptionAr: 'توزيع الشاليهات فوق الركائز البحرية مع دراسة حركة التيارات البحرية وحماية الشعب المرجانية.',
      descriptionEn: 'Environmental zoning, overwater boardwalk piling layouts, and coral reef conservation setbacks.',
      status: 'done',
      priority: 'high',
      weight: 25,
      progress: 100,
      assigneeId: 'usr_demo_arch',
      reviewerId: 'usr_demo',
      startDate: dateStr(-110),
      dueDate: dateStr(-70),
      createdAt: dateStr(-110),
      updatedAt: dateStr(-70)
    },
    {
      id: 'tsk_demo_10',
      projectId: 'prj_demo_resort',
      titleAr: 'اعتماد مخرجات التصميم المستدام وتقييم الأثر البيئي (EIA & Green Certification)',
      titleEn: 'Environmental Impact Assessment & Zero-Carbon Protocol',
      descriptionAr: 'إعداد التقارير الفنية المعتمدة لتقليل الانبعاثات الكربونية بنسبة 85% واستخدام مواد بناء محلية طبيعية.',
      descriptionEn: 'Technical submissions confirming 85% carbon reduction through locally sourced timber and rammed earth.',
      status: 'done',
      priority: 'medium',
      weight: 20,
      progress: 100,
      assigneeId: 'usr_demo_arch',
      reviewerId: 'usr_demo',
      startDate: dateStr(-60),
      dueDate: dateStr(-20),
      createdAt: dateStr(-60),
      updatedAt: dateStr(-20)
    }
  ];

  const demoDocuments = [
    {
      id: 'doc_demo_01',
      projectId: 'prj_demo_villa',
      taskId: 'tsk_demo_01',
      originalName: 'DARC-VILLA-ARCH-A101_Rev03.pdf',
      diskFilename: 'https://drive.google.com/file/d/demo_sample_drawing_villa/view',
      mimeType: 'application/pdf',
      size: 14.8 * 1024 * 1024,
      status: 'approved',
      uploaderId: 'usr_demo_arch',
      createdAt: dateStr(-15)
    },
    {
      id: 'doc_demo_02',
      projectId: 'prj_demo_villa',
      taskId: 'tsk_demo_03',
      originalName: 'PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg',
      diskFilename: 'https://drive.google.com/file/d/demo_sample_render_4k/view',
      mimeType: 'image/jpeg',
      size: 8.4 * 1024 * 1024,
      status: 'approved',
      uploaderId: 'usr_demo_3d',
      createdAt: dateStr(-5)
    },
    {
      id: 'doc_demo_03',
      projectId: 'prj_demo_tower',
      taskId: 'tsk_demo_07',
      originalName: 'SKYLINE-CW-SECTION-DETAILS-DWG.pdf',
      diskFilename: 'https://drive.google.com/file/d/demo_sample_facade_details/view',
      mimeType: 'application/pdf',
      size: 22.1 * 1024 * 1024,
      status: 'review',
      uploaderId: 'usr_demo_arch',
      createdAt: dateStr(-2)
    },
    {
      id: 'doc_demo_04',
      projectId: 'prj_demo_resort',
      taskId: 'tsk_demo_09',
      originalName: 'RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf',
      diskFilename: 'https://drive.google.com/file/d/demo_sample_masterplan/view',
      mimeType: 'application/pdf',
      size: 35.6 * 1024 * 1024,
      status: 'approved',
      uploaderId: 'usr_demo_arch',
      createdAt: dateStr(-70)
    }
  ];

  const demoComments = [
    {
      id: 'cmt_demo_01',
      taskId: 'tsk_demo_02',
      userId: 'usr_demo_int',
      content: 'تم تحديث ارتفاعات الأسقف الجبسية في الصالة لتصبح 3.80م صافي بعد التنسيق مع مهندس التكييف @م.حسامالدين.',
      createdAt: dateStr(-2)
    },
    {
      id: 'cmt_demo_02',
      taskId: 'tsk_demo_02',
      userId: 'usr_demo_mep',
      content: 'ممتاز جداً، قمنا بتعديل مجاري الهواء (Ducts) لتكون مضغوطة بعرض 25 سم لضمان عدم التعارض مع الإضاءة المخفية.',
      createdAt: dateStr(-1)
    },
    {
      id: 'cmt_demo_03',
      taskId: 'tsk_demo_07',
      userId: 'usr_demo',
      content: 'يرجى التأكد من مطابقة معامل نفاذية الحرارة (U-Value) لاشتراطات كود البناء الحديث قبل مرحلة التوريد.',
      createdAt: dateStr(-1)
    }
  ];

  const demoNotifications = [
    {
      id: 'notif_demo_01',
      userId: 'usr_demo',
      type: 'mention',
      content: 'تمت الإشارة إليك في مخططات الأسقف المعلقة لمشروع فيلا نخلة جميرا.',
      taskId: 'tsk_demo_02',
      projectId: 'prj_demo_villa',
      read: false,
      createdAt: dateStr(-1)
    },
    {
      id: 'notif_demo_02',
      userId: 'usr_demo',
      type: 'approval',
      content: 'تم اعتماد المخططات المعمارية التنفيذية الكاملة بنجاح.',
      taskId: 'tsk_demo_01',
      projectId: 'prj_demo_villa',
      read: true,
      createdAt: dateStr(-5)
    }
  ];

  const demoAuditLogs = [
    {
      id: 'aud_demo_01',
      userId: 'usr_demo_arch',
      action: 'create',
      entityType: 'document',
      entityId: 'doc_demo_01',
      details: { name: 'DARC-VILLA-ARCH-A101_Rev03.pdf', status: 'approved' },
      createdAt: dateStr(-15)
    },
    {
      id: 'aud_demo_02',
      userId: 'usr_demo_int',
      action: 'update',
      entityType: 'task',
      entityId: 'tsk_demo_02',
      details: { status: 'review', progress: 80 },
      createdAt: dateStr(-1)
    },
    {
      id: 'aud_demo_03',
      userId: 'usr_demo',
      action: 'login',
      entityType: 'user',
      entityId: 'usr_demo',
      details: { client: 'Web App', ip: 'Edge Session' },
      createdAt: dateStr(0)
    }
  ];

  return {
    updatedAt: new Date().toISOString(),
    isDemo: true,
    company: {
      name: 'DARC Design Team',
      nameAr: 'فريق دارك للتصميم والاستشارات الهندسية',
      nameEn: 'DARC Design Team & Architectural Engineering',
      logoUrl: null
    },
    user: demoUsers[0],
    role: {
      id: 'admin',
      nameAr: 'مدير النظام (عرض تجريبي)',
      nameEn: 'System Administrator (Demo Sandbox)',
      permissions: ['*'],
      builtIn: true
    },
    projects: demoProjects,
    tasks: demoTasks,
    documents: demoDocuments,
    comments: demoComments,
    templates: [
      { id: 'tpl_demo_01', code: '01', nameAr: 'مخططات معمارية كاملة', nameEn: 'Complete Architectural Drawings', defaultWeight: 12, categoryId: 'architectural' },
      { id: 'tpl_demo_02', code: '02', nameAr: 'مخططات الجدران والتشطيبات', nameEn: 'Wall Types & Finishing Plans', defaultWeight: 6, categoryId: 'architectural' },
      { id: 'tpl_demo_03', code: '03', nameAr: 'مخططات الأسقف وتوزيع الإنارة', nameEn: 'Ceiling Plans & Lighting', defaultWeight: 6, categoryId: 'electrical' },
      { id: 'tpl_demo_04', code: '04', nameAr: 'تفاصيل أعمال الديكور والأخشاب', nameEn: 'Carpentry & Joinery Details', defaultWeight: 5, categoryId: 'interior' },
      { id: 'tpl_demo_05', code: '05', nameAr: 'رندرات إظهار ثلاثي الأبعاد 3D', nameEn: 'Photorealistic 3D Renders', defaultWeight: 8, categoryId: 'visualization' }
    ],
    users: demoUsers,
    roles: [
      { id: 'admin', nameAr: 'مدير النظام', nameEn: 'System Administrator', permissions: ['*'], builtIn: true },
      { id: 'discipline_lead', nameAr: 'رئيس قسم تخصصي', nameEn: 'Discipline Lead', permissions: ['create_tasks', 'edit_tasks', 'review_tasks'], builtIn: true },
      { id: 'team_member', nameAr: 'عضو فريق التنفيذ', nameEn: 'Team Member', permissions: ['edit_tasks', 'upload_documents'], builtIn: true }
    ],
    notifications: demoNotifications,
    emailConfigured: false,
    stats: {
      activeProjects: 3,
      delayedProjects: 1,
      completedProjects: 1,
      projectCount: 4,
      openTasks: 7,
      activeTasks: 7,
      tasksInProgress: 2,
      tasksDueSoon: 2,
      dueSoon: 2,
      myTasks: 3,
      overdueTasks: 0,
      unassignedTasks: 0,
      completedTasks: 3,
      pendingApprovals: 3
    },
    auditLogs: demoAuditLogs
  };
}
