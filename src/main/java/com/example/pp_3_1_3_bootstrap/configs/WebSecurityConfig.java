package com.example.pp_3_1_3_bootstrap.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import com.example.pp_3_1_3_bootstrap.service.UserServiceImpl;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserServiceImpl userServiceImpl;

    private final SuccessUserHandler successUserHandler;

    @Autowired
    private PasswordConfig passwordConfig;

    @Autowired
    public WebSecurityConfig(SuccessUserHandler successUserHandler) {
        this.successUserHandler = successUserHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/index", "/registration").permitAll()
                .antMatchers("/admin/**").hasAuthority("ADMIN")
                .antMatchers("/user/**").hasAnyAuthority("ADMIN", "USER")
                .anyRequest().authenticated()
                .and()
                .formLogin().successHandler(successUserHandler)
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userServiceImpl).passwordEncoder(passwordConfig.passwordEncoder());
    }
}