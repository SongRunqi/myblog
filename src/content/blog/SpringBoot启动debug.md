Spring Boot Bean注入过程的详细步骤：

1. 应用上下文刷新
   位置：`AbstractApplicationContext.java`
   ```java
   public void refresh() {
       // ...
       invokeBeanFactoryPostProcessors(beanFactory);
       // ...
   }
   ```
   - 这是Spring容器启动的核心方法，其中调用了bean工厂后处理器。

2. 配置类后处理
   位置：`ConfigurationClassPostProcessor.java`
   - 调用 `processConfigBeanDefinitions(BeanDefinitionRegistry registry)`
   - 创建 `ConfigurationClassParser` 并调用 `parser.parse(candidates)`
   - 这一步后，BeanFactory 的 beanDefinitionMap 中会增加 controller 的 bean 定义

3. 配置类解析
   位置：`ConfigurationClassParser.java`
   ```java
   protected final SourceClass doProcessConfigurationClass(ConfigurationClass configClass, SourceClass sourceClass) throws IOException {
       // 处理 @ComponentScan 注解
       Set<AnnotationAttributes> componentScans = AnnotationConfigUtils.attributesForRepeatable(
           sourceClass.getMetadata(), ComponentScans.class, ComponentScan.class);
       // ...
   }
   ```
   - 处理成员类：`processMemberClasses(configClass, sourceClass)`

4. 组件扫描注解解析
   位置：`ComponentScanAnnotationParser.java`
   ```java
   public Set<BeanDefinitionHolder> parse(AnnotationAttributes componentScan, final String declaringClass) {
       ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(/* ... */);
       // ...
   }
   private List<TypeFilter> typeFiltersFor(AnnotationAttributes filterAttributes) {
       // 配置扫描器的过滤器
   }
   ```

5. 类路径Bean定义扫描
   位置：`ClassPathBeanDefinitionScanner.java`
   - 扫描指定的基础包：`scanner.doScan(String... basePackages)`
   - 查找候选组件：`Set<BeanDefinition> findCandidateComponents(basePackage)`

6. 资源模式解析
   位置：`PathMatchingResourcePatternResolver.java`
   - 查找匹配的文件资源：`doFindPathMatchingFileResources(rootDirResource, subPattern)`

7. 候选组件扫描
   位置：`ClassPathScanningCandidateComponentProvider.java`
   ```java
   scanCandidateComponents(String basePackage) {
       // ...
       MetadataReader metadataReader = getMetadataReaderFactory().getMetadataReader(resource);
       if (isCandidateComponent(metadataReader)) {
           ScannedGenericBeanDefinition sbd = new ScannedGenericBeanDefinition(metadataReader);
           sbd.setResource(resource);
           sbd.setSource(resource);
           // ...
       }
   }
   ```
   - 这一步骤详细说明了如何读取类的元数据并创建 bean 定义

Bean注入过程的关键点：

1. 启动流程：
   - Spring 容器刷新过程中，调用 `invokeBeanFactoryPostProcessors`
   - 这触发了 `ConfigurationClassPostProcessor` 的处理

2. 配置类处理：
   - `ConfigurationClassParser` 解析带有 `@Configuration` 注解的类
   - 处理 `@ComponentScan`, `@Import`, `@Bean` 等注解

3. 组件扫描：
   - `@ComponentScan` 注解触发 `ClassPathBeanDefinitionScanner`
   - 扫描器使用 `ClassPathScanningCandidateComponentProvider` 查找候选组件

4. 资源加载：
   - 使用 `PathMatchingResourcePatternResolver` 查找类路径下的资源

5. 元数据读取：
   - 使用 `MetadataReader` 读取类的元数据
   - 根据元数据判断是否为候选组件

6. Bean定义创建：
   - 对于候选组件，创建 `ScannedGenericBeanDefinition`
   - 设置资源和源信息

7. Bean定义注册：
   - 将创建的 Bean 定义注册到 `BeanDefinitionRegistry`（通常是 `DefaultListableBeanFactory`）
