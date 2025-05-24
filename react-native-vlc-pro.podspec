require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-vlc-pro"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = "Professional VLC media player component for React Native applications with advanced features"
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/react-native-vlc/react-native-vlc-pro.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
  s.dependency "MobileVLCKit", "~> 4.0.0a2"  # Version moderne 2025 avec PiP et nouvelles fonctionnalités
  
  s.ios.deployment_target = '12.0'
  s.swift_version = '5.0'
  
  # Configuration pour les nouvelles fonctionnalités VLC 4.0
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_OPTIMIZATION_LEVEL' => '-O',
    'ENABLE_BITCODE' => 'NO'
  }
  
  s.user_target_xcconfig = {
    'ENABLE_BITCODE' => 'NO'
  }
end 