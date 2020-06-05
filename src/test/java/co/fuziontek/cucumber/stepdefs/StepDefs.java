package co.fuziontek.cucumber.stepdefs;

import co.fuziontek.GeargatewayApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = GeargatewayApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
